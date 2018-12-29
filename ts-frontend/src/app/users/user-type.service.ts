import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {UserTypeModel} from './user-type.model';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  usersChanged = new Subject<UserTypeModel[]>();

  private userTypes: UserTypeModel[] = [
    new UserTypeModel(1, 'ADMIN'),
    new UserTypeModel(2, 'USER'),
  ];

  constructor() { }

  getUserTypes() {
    return this.userTypes.slice();
  }

  setUsersTypes(userTypes: UserTypeModel[]) {
    this.userTypes = userTypes;
    this.usersChanged.next(this.userTypes.slice());
  }

  getUserType(id: number) {
    for (let i = 0; i < this.userTypes.length; i++) {
      if (this.userTypes[i].id === id) {
        return this.userTypes[i];
      }
    }
  }

  getUserTypeName(id: number) {
    for (let i = 0; i < this.userTypes.length; i++) {
      if (this.userTypes[i].id === id) {
        return this.userTypes[i].typeName;
      }
    }
  }
}
