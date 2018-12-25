import { Injectable } from '@angular/core';
import {User} from './user.model';
import {Subject} from 'rxjs';

@Injectable()
export class UsersService {
  usersChanged = new Subject<User[]>();

  private users: User[] = [
    new User(1, 'Elvedin', 'Sinanovic', 'elva', '', 'elva@elva.com', 1, 1, 1),
    new User(2, 'Ervin', 'Beus', 'ervin', '', 'ervin@ervin.com', 1, 1, 2),
    new User(3, 'Ena', 'Muratspahic', 'fly', '', 'ena@ena.com', 1, 1, 3),
    new User(3, 'Obicni', 'Obicnjak', 'obicni', '', 'obicni@obicni.com', 2, 2, 4),
  ];

  constructor() { }

  getUsers() {
    return this.users.slice();
  }

  addUser(user: User) {
    this.users.push(user);
    this.usersChanged.next(this.users.slice());
  }

  updateUser(index: number, newUser: User) {
    this.users[index] = newUser;
    this.usersChanged.next(this.users.slice());
  }

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  getUser(id: number) {
    return this.users[id];
  }

  deleteUser(id: number) {
    this.users.splice(id, 1);
    this.usersChanged.next(this.users.slice());
  }
}
