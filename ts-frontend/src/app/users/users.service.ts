import { Injectable } from '@angular/core';
import {User} from './user.model';
import {Subject} from 'rxjs';
import {GroupModel} from '../groups/group.model';
import {UserTypeModel} from './user-type.model';

@Injectable()
export class UsersService {
  usersChanged = new Subject<User[]>();
  groupUsersChanged = new Subject<User[]>();
  loggedInUserChanged = new Subject<User[]>();
  usersURL = 'http://192.168.0.17:8090/korisnici_ms/users/';
  private groupUsers: User[] = [];

  private users: User[] = [
    new User(1, 'Elvedin' + ' ' + 'Sinanovic', 'elva',  'elva@elva.com', new GroupModel(1, 'Grupa1'), new UserTypeModel(1, 'ADMIN')),
    new User(2, 'Ervin' + ' ' + 'Ervin', 'ervin',  'ervin@ervin.com', new GroupModel(1, 'Grupa1'), new UserTypeModel(1, 'ADMIN')),
    new User(3, 'Ena' + ' ' + 'Muratspahic', 'fly',  'ena@ena.com', new GroupModel(1, 'Grupa1'), new UserTypeModel(1, 'ADMIN')),
    new User(4, 'Obicni' + ' ' + 'Obicnjak', 'obicni',  'obicni@obicni.com', new GroupModel(2, 'Grupa2'), new UserTypeModel(2, 'USER')),
  ];

  private loggedInUser: User[] = [
    new User(1, 'Elvedin' + ' ' + 'Sinanovic', 'elva',  'elva@elva.com', new GroupModel(1, 'Grupa1'), new UserTypeModel(1, 'ADMIN')),
  ];

  constructor() {
  }

  getUsersApi() {
  }

  getUsers() {
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
      if (this.users[i].grupaKorisnika.id === gid) {
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
    if (users !== null) {
      this.users = users;
    }
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
