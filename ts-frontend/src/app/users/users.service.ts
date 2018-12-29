import { Injectable } from '@angular/core';
import {User} from './user.model';
import {Subject} from 'rxjs';
import {GroupModel} from '../groups/group.model';
import {UserTypeModel} from './user-type.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class UsersService {
  usersChanged = new Subject<User[]>();
  groupUsersChanged = new Subject<User[]>();
  loggedInUserChanged = new Subject<User[]>();

  tempUser = null;
  tempUserChanged = new Subject<User>();

  geAllUsersURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'users/';
  usersInGroupURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'users/group/';
  userByIdURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'users/';
  userByUsernameURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'users?userName=';
  addUserURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'users/add';
  updateUserURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'users/update/';
  adminUpdateUserURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'users/admin/update/';
  deleteUserURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'users/delete/';

  private groupUsers: User[] = [];

  private users: User[] = [
  ];

  private loggedInUser: User[] = [
  ];

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private dataStorageService: DataStorageService,
              private router: Router) {
  }

  getUsers() {
    this.getAllUsersApi();
  }

  getLoggedInUser() {
    return this.loggedInUser.slice();
  }

  setLoggedInUser() {
    this.getUserById(this.authService.getLoggedInUserId());
    this.tempUserChanged.subscribe((user: User) => {
      this.loggedInUser[0] = user;
      this.loggedInUserChanged.next(this.loggedInUser.slice());
    });
  }

  findByUsername(username: string): User {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === username) {
        return this.users[i];
      }
    }
    return null;
  }

  getNextId() {
    const lastUser = this.users[this.users.length - 1];
    return lastUser.id + 1;
  }

  getGroupUsers(gid: number) {
    this.groupUsers = [];
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].grupaKorisnika.id === gid) {
        this.groupUsers.push(this.users[i]);
      }
    }
    this.groupUsersChanged.next(this.groupUsers.slice());
    return this.groupUsers.slice();
  }

  setGroupUsers(gid: number) {
    this.getUsersInAGroup(gid);
  }

  addUser(user: User) {
    this.users.push(user);
    this.usersChanged.next(this.users.slice());
  }

  updateUser(newUser: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === newUser.id) {
        this.users[i] = newUser;
      }
    }
    this.usersChanged.next(this.users.slice());
    if (this.authService.getLoggedInUserRole() === 'USER') {
      this.loggedInUser[0] = newUser;
      this.loggedInUserChanged.next(this.loggedInUser.slice());
      this.usersChanged.next(this.users.slice());
    }
  }

  getLocalUser(id: number) {
    console.log('LOCAL USERS', this.users);
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return this.users[i];
      }
    }
  }

  getUser(id: number) {
    // for (let i = 0; i < this.users.length; i++) {
    //   if (this.users[i].id === id) {
    //     return this.users[i];
    //   }
    // }
    this.getUserById(id);
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].id === id) {
          this.users.splice(i, 1);
        }
      }
      this.deleteUserApi(id);
      this.usersChanged.next(this.users.slice());
    }
  }

  checkUsernameExists(name: string): boolean {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === name) {
        return true;
      }
    }
    return false;
  }

  ///////////////////////////// API Calls \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  getAllUsersApi() {
    this.httpClient.get<User[]>(this.geAllUsersURL,
      {
        headers: new HttpHeaders()
          .set('Access-Control-Allow-Origin', '*')
          .append('Authorization', 'Bearer ' + this.authService.getToken().access_token)
      })
      .subscribe(
        (users: User[]) => {
          console.log('All users', users);
          this.users = users;
          this.usersChanged.next(this.users.slice());
        },
        (error1 => {
          console.log('All users error: ', error1);
        })
      );
  }

  getUsersInAGroup (gid: number) {
    this.httpClient.get<User[]>(this.usersInGroupURL + gid,
      {
        headers: new HttpHeaders()
          .set('Access-Control-Allow-Origin', '*')
          .append('Authorization', 'Bearer ' + this.authService.getToken().access_token)
      })
      .subscribe(
        (users: User[]) => {
          console.log('Users in group', users);
          this.groupUsers = users;
          this.groupUsersChanged.next(this.groupUsers.slice());
        },
        (error1 => {
          console.log('Users in group error: ', error1);
        })
      );
  }

  getUserById(id: number) {
    this.httpClient.get<User>( this.userByIdURL + id,
      {
        headers: new HttpHeaders()
          .set('Access-Control-Allow-Origin', '*')
          .append('Authorization', 'Bearer ' + this.authService.getToken().access_token)
      })
      .subscribe(
        (user: User) => {
          console.log('User by id response', user);
          this.tempUser = user;
          this.tempUserChanged.next(this.tempUser);
        },
        (error1 => {
          console.log('User by id error: ', error1);
        })
      );
  }

  getUserByUsername(username: string) {
    this.httpClient.get<User>(this.userByUsernameURL + username,
      {
        headers: new HttpHeaders()
          .set('Access-Control-Allow-Origin', '*')
          .append('Authorization', 'Bearer ' + this.authService.getToken().access_token)
      })
      .subscribe(
        (user: User) => {
          console.log('User by username response', user);
          // this.usersService.setUsers(users);
        },
        (error1 => {
          console.log('User by username error: ', error1);
        })
      );
  }

  addUserApi(newUser: User, password: string) {
    const userFormData = this.createUserBodyFromUserData(newUser, password);
    this.httpClient.post( this.addUserURL, userFormData,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.authService.getToken().access_token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (user: User) => {
          console.log('User added response', user);
          this.addUser(newUser);
        },
        (error1 => {
          console.log('User added  error: ', error1);

            alert('User can\'t be added at the moment');
            this.router.navigate(['/users']);

        })
      );
  }

  updateUserFromUser(id: number, newUser: User, password: string) {
    const userFormData = this.createUpdateBodyFromUser(newUser, password);
    this.httpClient.put( this.updateUserURL + id, userFormData.toString(),
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.authService.getToken().access_token)
          .append('Access-Control-Allow-Origin', '*')
          .append('Content-Type', 'application/x-www-form-urlencoded')
      })
      .subscribe(
        (user: User) => {
          console.log('User updated response', user);
          this.updateUser(user);
        },
        (error1 => {
          console.log('User updated error: ', error1);
          alert('User can\'t be edited at the moment');
          this.router.navigate(['/users']);
        })
      );
  }

  updateUserFromAdmin(id: number, newUser: User, password: string) {
    const userFormData = this.createUpdateBodyFromAdmin(newUser, password);
    this.httpClient.put( this.adminUpdateUserURL + id, userFormData.toString(),
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.authService.getToken().access_token)
          .append('Access-Control-Allow-Origin', '*')
          .append('Content-Type', 'application/x-www-form-urlencoded')
      })
      .subscribe(
        (user: User) => {
          console.log('User updated response', user);
          this.updateUser(user);
          this.usersChanged.next(this.users.slice());
        },
        (error1 => {
          console.log('User updated error: ', error1);
          alert('User can\'t be edited at the moment');
          this.router.navigate(['/users']);
        })
      );
  }

  deleteUserApi(id: number) {
    this.httpClient.delete( this.deleteUserURL + id,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.authService.getToken().access_token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (user: User) => {
          console.log('User deleted response', user);
          // this.usersService.setUsers(users);
        },
        (error1 => {
          console.log('User deleted error: ', error1);
        })
      );
  }

  private createUserBodyFromUserData(newUser: User, password: string) {
    const formData = new FormData();
    const fullName = newUser.fullName.split(' ');
    formData.append('firstName', fullName[0]);
    formData.append('lastName', fullName[1]);
    formData.append('userName', newUser.username);
    formData.append('password', password);
    formData.append('userTypeId', newUser.tipKorisnika.id + '');
    formData.append('userGroupId', newUser.grupaKorisnika.id + '');
    formData.append('deviceId', '');
    formData.append('email', newUser.email);
    return formData;
  }

  private createUpdateBodyFromUser(newUser: User, password: string) {
    const formData = new URLSearchParams();
    const fullName = newUser.fullName.split(' ');
    formData.set('firstName', fullName[0]);
    formData.set('lastName', fullName[1]);
    formData.set('userName', newUser.username);
    formData.set('password', password);
    formData.set('email', newUser.email);
    return formData;
  }

  private createUpdateBodyFromAdmin(newUser: User, password: string) {
    const formData = new URLSearchParams();
    const fullName = newUser.fullName.split(' ');
    formData.set('firstName', fullName[0]);
    formData.set('lastName', fullName[1]);
    formData.set('userName', newUser.username);
    formData.set('userTypeId', newUser.tipKorisnika.id + '');
    formData.set('userGroupId', newUser.grupaKorisnika.id + '');
    formData.set('email', newUser.email);
    return formData;
  }


}
