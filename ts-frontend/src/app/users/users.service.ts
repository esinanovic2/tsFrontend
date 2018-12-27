import { Injectable } from '@angular/core';
import {User} from './user.model';
import {Subject} from 'rxjs';
import {Http} from '@angular/http';
import {map} from 'rxjs/operators';
import {Response} from '@angular/http';


@Injectable()
export class UsersService {
  usersChanged = new Subject<User[]>();
  groupUsersChanged = new Subject<User[]>();
  loggedInUserChanged = new Subject<User[]>();
  usersURL = 'http://192.168.0.17:8090/korisnici_ms/users/';
  private groupUsers: User[] = [];

  private users: User[] = [
    new User(1, 'Elvedin', 'Sinanovic', 'elva', '', 'elva@elva.com', 1, 1, 1),
    new User(2, 'Ervin', 'Beus', 'ervin', '', 'ervin@ervin.com', 1, 1, 2),
    new User(3, 'Ena', 'Muratspahic', 'fly', '', 'ena@ena.com', 1, 1, 3),
    new User(4, 'Obicni', 'Obicnjak', 'obicni', '', 'obicni@obicni.com', 2, 2, 4),
    new User(5, 'Obicni2', 'Obicnjak2', 'obicni2', '', 'obicni@obicni.com', 2, 2, 5),
    new User(6, 'Obicni3', 'Obicnjak3', 'obicni3', '', 'obicni@obicni.com', 2, 3, 6),
    new User(7, 'Obicni4', 'Obicnjak4', 'obicni4', '', 'obicni@obicni.com', 2, 3, 7),
  ];

  private loggedInUser: User[] = [
    new User(1, 'Elvedin', 'Sinanovic', 'elva', '', 'elva@elva.com', 1, 1, 1),
  ];

  constructor(private http: Http) { }

  getUsers() {
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOjEsIlVHcm91cCI6IkdydXBhMSIsInVzZXJfbmFtZSI6ImpCYXVlciIsInNjb3BlIjpbIm1vYmlsZSJdLCJVVHlwZSI6IkFETUlOIiwiZXhwIjoxNTQ1OTEzNTA5LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl0sImp0aSI6IjM4NDNhMTRiLTc0NmEtNDA0Yy04ZDRjLTY5YTFjY2FmMDhmYiIsImNsaWVudF9pZCI6ImNsaWVudCJ9.KumAmrtsVttfpfbsKytt3JLew5AiK3yRHAmXwyJDx--IhehxGduUrqMoPhuwBZJAe3D91ezyuYmjC4-XBLw85H2sKdF6s2s6PF_m4UfJqGS9XwgSuLls2XAx1MgU1--0C0uIQeVOncUjUih8JMRWjs7u9yqVK3j5xGu_EItPAf78bP54fR34qKPxtMX0gaEGQeQz4rwXFf-uiZ7aKRcVSRpVamDVhL5KI79Vgal4ToYGMfZZVpQAjWf6O2pSOyArp0qi-5KfHMCEnXoSV4NpcvyQezNw3cX4gM-GriVaBKTxwWGrFm_A1c2RHwFSjI8QliUGDpd1MtdQCJ6U-EpT1A';
    const header = new Headers({'Authorization': 'Bearer ' + token});
    // @ts-ignore
    this.http.get(this.usersURL, {headers: [header, header]})
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
    return this.users.slice();
  }

  getLoggedInUser() {
    return this.loggedInUser.slice();
  }

  setLoggedInUser(username: string) {
    this.loggedInUser[0] = this.findByUsername(username);
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
      if (this.users[i].userGroupId === gid) {
        this.groupUsers.push(this.users[i]);
      }
    }
    this.groupUsersChanged.next(this.groupUsers.slice());
    return this.groupUsers.slice();
  }

  addUser(user: User) {
    this.users.push(user);
    this.usersChanged.next(this.users.slice());
  }

  updateUser(index: number, newUser: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === index) {
        this.users[i] = newUser;
        this.loggedInUser[0] = this.users[i];
      }
    }
    this.loggedInUserChanged.next(this.loggedInUser.slice());
    this.usersChanged.next(this.users.slice());
  }

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUser(id: number) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return this.users[i];
      }
    }
  }

  deleteUser(id: number) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        this.users.splice(i, 1);
      }
    }
    this.usersChanged.next(this.users.slice());
  }

  checkUsernameExists(name: string): boolean {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === name) {
        return true;
      }
    }
    return false;
  }

}
