import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupModel} from '../group.model';
import {GroupService} from '../group.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {RoleGuardService} from '../../auth/role-guard.service';
import {UsersService} from '../../users/users.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, OnDestroy {
  groups: GroupModel[];
  subscription: Subscription;
  role: string;

  constructor(private groupsService: GroupService,
              private userService: UsersService,
              private roleGuardService: RoleGuardService,
              private router: Router) {
    this.userService.loggedInUserChanged.subscribe( (tempUser) => {
      this.groupsService.setUserGroup(tempUser);
    });
  }

  ngOnInit() {
    this.userService.loggedInUserChanged.subscribe( (tempUser) => {
      this.groupsService.setUserGroup(tempUser);
    });
    this.groupsService.setGroups();
    this.role = this.roleGuardService.token.role;
    if (this.role === 'admin') {
      this.subscription = this.groupsService.groupsChanged
        .subscribe((groups: GroupModel[]) => {
          this.groups = groups;
        });
      this.groups = this.groupsService.getGroups();
    } else if (this.role === 'user') {
      this.subscription = this.groupsService.userGroupChanged
        .subscribe((groups: GroupModel[]) => {
          this.groups = groups;
        });
      this.groups = this.groupsService.getUserGroup();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddGroup() {
    this.router.navigate( ['addGroup']);
  }
}
