import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {User} from '../users/user.model';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GroupModel} from '../groups/group.model';
import {UsersService} from '../users/users.service';
import {TokenModel} from '../auth/token.model';
import {UserTypeModel} from '../users/user-type.model';
import {Trip} from '../trips/trip.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  hostIp = 'http://192.168.0.17';
  portAndMs = ':8090/korisnici_ms/';
  loginURL = this.hostIp + this.portAndMs + 'oauth/token';
  geAllUsersURL = this.hostIp + this.portAndMs + 'users/';
  usersInGroupURL = this.hostIp + this.portAndMs + 'users/group/';
  userByIdURL = this.hostIp + this.portAndMs + 'users/';
  userByUsernameURL = this.hostIp + this.portAndMs + 'users?userName=';
  addUserURL = this.hostIp + this.portAndMs + 'users/add';
  updateUserURL = this.hostIp + this.portAndMs + 'users/update/';
  adminUpdateUserURL = this.hostIp + this.portAndMs + 'users/admin/update/';
  deleteUserURL = this.hostIp + this.portAndMs + 'users/delete/';

  getAllGroupsURL = this.hostIp + this.portAndMs + 'groups/';
  getGroupByNameURL = this.hostIp + this.portAndMs + 'groups?groupName=';
  getGroupByIdURL = this.hostIp + this.portAndMs + 'groups/';
  addGroupURL = this.hostIp + this.portAndMs + 'groups/add';
  updateGroupURL = this.hostIp + this.portAndMs + 'groups/update/';
  deleteGroupURL = this.hostIp + this.portAndMs + 'groups/delete';

  getAllTypesURL = this.hostIp + this.portAndMs + 'userTypes/';
  getTypeByIdURL = this.hostIp + this.portAndMs + 'userTypes/';

  getAllTripsByUserURL = this.hostIp + ':8090/putovanja/trip/by-user/';

  tokenHeader: Headers;
  corsHeader: Headers;
  header: Headers;
  token: string;

  dummyUser = {grant_type: 'password',
               scope: 'mobile',
               username: 'jBauer',
               password: '1234'};
  dUser = new FormData();

  grupa1 = new GroupModel(1, 'Grupa1');
  tip1 = new UserTypeModel(1, 'ADMIN');
  newUser = new User(null, 'Novi5 ' + 'User5', 'noviusername5',   'user@email5.com', this.grupa1, this.tip1);
  updatedUser = new User(null, 'Updated4 ' + 'User4', 'updateduser4',   'updated4@email.com', this.grupa1, this.tip1);

  constructor(private authService: AuthService,
              private http: Http,
              private httpClient: HttpClient,
              private usersService: UsersService
              ) {
    this.tokenHeader = new Headers({'Authorization': 'Basic' + btoa('client: secret')});
    this.token = authService.getToken();
    this.header = new Headers({'Authorization': 'Bearer ' + this.token});
    this.corsHeader = new Headers({'Access-Control-Allow-Origin': '*'});
    this.dUser = DataStorageService.createTokenBodyFromStrings(this.dummyUser.grant_type,
                                                               this.dummyUser.scope, this.dummyUser.username, this.dummyUser.password);
    // this.getToken();
    // this.getAllUsersClient();
    // this.getUsersInAGroup(1);
    // this.getUserById(1);
    // this.getUserByUsername('jBauer');
    // this.getAllGroups();
    // this.getGroupById(1);
    // this.getGroupByName('Grupa1');
    // this.getAllTypes();
    // this.getTypeById(1);
    // this.getTripsByUserId(1);

    // this.addUser(this.newUser);
    // this.updateUserFromUser(9, this.updatedUser);
    // this.deleteUser(11);
    this.getAllGroups();
    this.getGroupById(1);
    this.getGroupByName('Grupa1');
    this.addGroup(new GroupModel(5, 'NewGroup'));
    this.updateGroup(5,  new GroupModel(5, 'UpdatedGroup'));
    this.deleteGroup(5);

  }

  private static createTokenBodyFromStrings(grant_type: string, scope: string, username: string, password: string) {
    const formData = new FormData();

    formData.append('grant_type', grant_type);
    formData.append('scope', scope);
    formData.append('username', username);
    formData.append('password', password);

    return formData;
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

  ////////////// USERS \\\\\\\\\\\\\

  getToken() {
    const credentials = {username: 'client', password: 'secret'};
    this.httpClient.post<TokenModel>(this.loginURL, this.dUser,
      {
        headers: new HttpHeaders()
          .set('Access-Control-Allow-Origin', '*')
          .append('Authorization', 'Basic ' + btoa('client:secret'))
      })
      .subscribe(
        (token) => {
          return console.log('Token response:', token);
        },
        (error1 => {
          console.log('Token error: ', error1);
        })
      );
  }

  getAllUsersClient() {
    this.httpClient.get<User[]>(this.geAllUsersURL,
      {
        headers: new HttpHeaders()
          .set('Access-Control-Allow-Origin', '*')
          .append('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(
        (users: User[]) => {
            console.log('All users', users);
            this.usersService.setUsers(users);
            // return users;
        },
        (error1 => {
          console.log('All users error: ', error1);
        })
      );
    // return null;
  }

  getUsersInAGroup (gid: number) {
    this.httpClient.get<User[]>(this.usersInGroupURL + gid,
      {
        headers: new HttpHeaders()
          .set('Access-Control-Allow-Origin', '*')
          .append('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(
        (users: User[]) => {
          console.log('Users in group', users);
          // this.usersService.setUsers(users);
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
          .append('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(
        (user: User) => {
          console.log('User by id response', user);
          // this.usersService.setUsers(users);
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
          .append('Authorization', 'Bearer ' + this.token)
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

  addUser(newUser: User) {
    const userFormData = this.createUserBodyFromUserData(newUser, '1234');
    this.httpClient.post( this.addUserURL, userFormData,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (user: User) => {
          console.log('User added response', user);
          // this.usersService.setUsers(users);
        },
        (error1 => {
          console.log('User added  error: ', error1);
        })
      );
  }

  updateUserFromUser(id: number, newUser: User) {
    const userFormData = this.createUpdateBodyFromUser(newUser, '1234');
    this.httpClient.put( this.updateUserURL + id, userFormData.toString(),
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.token)
          .append('Access-Control-Allow-Origin', '*')
          .append('Content-Type', 'application/x-www-form-urlencoded')
      })
      .subscribe(
        (user: User) => {
          console.log('User updated response', user);
          // this.usersService.setUsers(users);
        },
        (error1 => {
          console.log('User updated error: ', error1);
        })
      );
  }

  updateUserFromAdmin(id: number, newUser: User) {
    const userFormData = this.createUpdateBodyFromAdmin(newUser, '1234');
    this.httpClient.put( this.adminUpdateUserURL + id, userFormData.toString(),
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.token)
          .append('Access-Control-Allow-Origin', '*')
          .append('Content-Type', 'application/x-www-form-urlencoded')
      })
      .subscribe(
        (user: User) => {
          console.log('User updated response', user);
          // this.usersService.setUsers(users);
        },
        (error1 => {
          console.log('User updated error: ', error1);
        })
      );
  }

  deleteUser(id: number) {
    this.httpClient.delete( this.deleteUserURL + id,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.token)
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

  ////////////// GROUPS \\\\\\\\\\\\\

  getAllGroups() {
    this.httpClient.get<GroupModel[]>(this.getAllGroupsURL,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (groups: GroupModel[]) => {
          console.log('All groups response', groups);
        },
        (error1 => {
          console.log('All groups error: ', error1);
        })
      );
  }

  getGroupById(id: number) {
    this.httpClient.get<GroupModel>(this.getGroupByIdURL + id,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (group: GroupModel) => {
          console.log('Group by id response', group);
        },
        (error1 => {
          console.log('Group by id error: ', error1);
        })
      );
  }

  getGroupByName(name: string) {
    this.httpClient.get<GroupModel>(this.getGroupByNameURL + name,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (group: GroupModel) => {
          console.log('Group by nameresponse', group);
        },
        (error1 => {
          console.log('Group by name error: ', error1);
        })
      );
  }

  addGroup(newGroup: GroupModel) {

  }

  updateGroup(id: number, newGroup: GroupModel) {

  }

  deleteGroup(id: number) {

  }
  ////////////// TYPES \\\\\\\\\\\\\

  getAllTypes() {
    this.httpClient.get<UserTypeModel[]>(this.getAllTypesURL,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (types: UserTypeModel[]) => {
          console.log('All types response', types);
        },
        (error1 => {
          console.log('All types error: ', error1);
        })
      );
  }

  getTypeById(id: number) {
    this.httpClient.get<UserTypeModel>(this.getTypeByIdURL + id,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (type: UserTypeModel) => {
          console.log('Type by id response', type);
        },
        (error1 => {
          console.log('Type by id error: ', error1);
        })
      );
  }

  ////////////// TRIPS \\\\\\\\\\\\\

  getTripsByUserId(id: number) {
    this.httpClient.get<Trip[]>(this.getAllTripsByUserURL + id,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (trips: Trip[]) => {
          console.log('All types response', trips);
        },
        (error1 => {
          console.log('All types error: ', error1);
        })
      );
  }
}
