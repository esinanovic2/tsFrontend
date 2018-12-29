import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {GroupModel} from './group.model';
import {UsersService} from '../users/users.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../users/user.model';
import {AuthService} from '../auth/auth.service';
import {DataStorageService} from '../shared/data-storage.service';
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  hostIp = 'http://192.168.0.17';
  portAndMs = ':8090/korisnici_ms/';

  getAllGroupsURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'groups/';
  getGroupByNameURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'groups?groupName=';
  getGroupByIdURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'groups/';
  addGroupURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'groups/add';
  updateGroupURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'groups/update/';
  deleteGroupURL = DataStorageService.hostIp + DataStorageService.portAndMs + 'groups/delete/';

  groupsChanged = new Subject<GroupModel[]>();
  userGroupChanged = new Subject<GroupModel[]>();
  private groups: GroupModel[] = [
    // new GroupModel(1, 'Grupa1'),
    // new GroupModel(2, 'Grupa2'),
    // new GroupModel(3, 'Grupa3'),
    // new GroupModel(4, 'Grupa4'),
  ];

  private userGroup: GroupModel[] = [];

  constructor(private userService: UsersService,
              private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router,
              ) {
    this.userService.loggedInUserChanged.subscribe( (tempUser) => {
      this.setUserGroup(tempUser);
    });

  }

  getNextId() {
    const lastGroup = this.groups[this.groups.length - 1];
    return lastGroup.id + 1;
  }

  addGroup(group: GroupModel) {
    this.addGroupApi(group);
  }

  getGroups() {
    return this.groups.slice();
  }

  setGroups() {
    this.getAllGroups();
    this.groupsChanged.next(this.groups.slice());
  }

  setUserGroup(tempUser: User[]) {
    this.getGroupById(tempUser[0].grupaKorisnika.id)
    this.userGroup[0] = this.getGroup(tempUser[0].grupaKorisnika.id);
    this.userGroupChanged.next(this.userGroup.slice());
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
    this.updateGroupApi(id, newGroup);
  }

  deleteGroup(id: number) {
    if (confirm('Are you sure you want to delete this group?')) {
      this.deleteGroupApi(id);
      this.groupsChanged.next(this.groups.slice());
    }
  }

  /////////////////////////////// API Pozivi \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


  getAllGroups() {
    this.httpClient.get<GroupModel[]>(this.getAllGroupsURL,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.authService.getToken().access_token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (groups: GroupModel[]) => {
          this.groups = groups;
          this.groupsChanged.next(this.groups.slice());
        },
        (error1 => {

        })
      );
  }

  getGroupById(id: number) {
    this.httpClient.get<GroupModel>(this.getGroupByIdURL + id,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.authService.getToken().access_token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (group: GroupModel) => {
          console.log('Group by id response', group);
          this.userGroup[0] = group;
          this.userGroupChanged.next(this.userGroup.slice());
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
          .set('Authorization', 'Bearer ' + this.authService.getToken().access_token)
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

  addGroupApi(newGroup: GroupModel) {
    const groupFormData = new FormData();
    groupFormData.append('groupName', newGroup.groupName);
    this.httpClient.post( this.addGroupURL, groupFormData,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.authService.getToken().access_token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (group: User) => {
          this.groups.push(newGroup);
          this.groupsChanged.next(this.groups.slice());
        },
        (error1 => {
          alert('Group can\'t be added at the moment');
          this.router.navigate(['/groups']);
        })
      );
  }

  updateGroupApi(id: number, newGroup: GroupModel) {
    const groupFormData = new URLSearchParams();
    groupFormData.set('groupName', newGroup.groupName);
    this.httpClient.put( this.updateGroupURL + id, groupFormData.toString(),
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.authService.getToken().access_token)
          .append('Access-Control-Allow-Origin', '*')
          .append('Content-Type', 'application/x-www-form-urlencoded')
      })
      .subscribe(
        (group: GroupModel) => {
          for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].id === id) {
              this.groups[i] = newGroup;
            }
          }
          this.groupsChanged.next(this.groups.slice());
        },
        (error1 => {
          alert('Group can\'t be updated at the moment');
          this.router.navigate(['/groups']);
        })
      );
  }

  deleteGroupApi(id: number) {
    this.httpClient.delete( this.deleteGroupURL + id,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.authService.getToken().access_token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (group: GroupModel) => {
          console.log('Group deleted response', group);
          for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].id === id) {
              this.groups.splice(i, 1);
            }
          }
        },
        (error1 => {
          alert('Group can\'t be deleted at the moment');
          this.router.navigate(['/groups']);
        })
      );
  }



}
