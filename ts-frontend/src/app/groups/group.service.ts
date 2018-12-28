import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {UserTypeModel} from '../users/user-type.model';
import {GroupModel} from './group.model';
import {UsersService} from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groupsChanged = new Subject<GroupModel[]>();
  userGroupChanged = new Subject<GroupModel[]>();
  private groups: GroupModel[] = [
    new GroupModel(1, 'Grupa 1'),
    new GroupModel(2, 'Grupa 2'),
    new GroupModel(3, 'Grupa 3'),
    new GroupModel(4, 'Grupa 4'),
  ];

  private userGroup: GroupModel[] = [];

  constructor(private userService: UsersService) {
    const tempGroup = this.getGroup(userService.getLoggedInUser()[0].grupaKorisnika.id);
    this.userGroup.push(tempGroup);
    this.userGroupChanged.next(this.userGroup.slice());
  }

  getNextId() {
    const lastGroup = this.groups[this.groups.length - 1];
    return lastGroup.id + 1;
  }

  addGroup(group: GroupModel) {
    this.groups.push(group);
    this.groupsChanged.next(this.groups.slice());
  }

  getGroups() {
    return this.groups.slice();
  }

  setGroups(userGroups: GroupModel[]) {
    this.groups = userGroups;
    this.groupsChanged.next(this.groups.slice());
  }

  getUserGroup() {
    return this.userGroup.slice();
  }

  getGroup(id: number) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === id) {
        return this.groups[i];
      }
    }
  }

  checkGroupNameExists (name: string): boolean {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].groupName === name) {
        return true;
      }
    }
    return false;
  }

  getGroupName(id: number) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === id) {
        return this.groups[i].groupName;
      }
    }
  }

  updateGroup(id: number, newGroup: GroupModel) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === id) {
        this.groups[i] = newGroup;
      }
    }
    this.groupsChanged.next(this.groups.slice());
  }

  deleteGroup(id: number) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === id) {
        this.groups.splice(i, 1);
      }
    }
    this.groupsChanged.next(this.groups.slice());
  }
}
