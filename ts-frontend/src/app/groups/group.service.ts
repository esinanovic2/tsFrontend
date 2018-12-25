import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {UserTypeModel} from '../users/user-type.model';
import {GroupModel} from './group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groupsChanged = new Subject<GroupModel[]>();

  private groups: GroupModel[] = [
    new GroupModel(1, 'Grupa 1'),
    new GroupModel(2, 'Grupa 2'),
    new GroupModel(3, 'Grupa 3'),
    new GroupModel(4, 'Grupa 4'),
  ];

  constructor() { }

  getGroups() {
    return this.groups.slice();
  }

  setGroups(userTypes: UserTypeModel[]) {
    this.groups = userTypes;
    this.groupsChanged.next(this.groups.slice());
  }

  getGroup(id: number) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === id) {
        return this.groups[i];
      }
    }
  }

  getGroupName(id: number) {
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].id === id) {
        return this.groups[i].name;
      }
    }
  }
}
