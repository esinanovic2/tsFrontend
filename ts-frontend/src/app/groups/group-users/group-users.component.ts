import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {User} from '../../users/user.model';
import {GroupService} from '../group.service';
import {UsersService} from '../../users/users.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css']
})
export class GroupUsersComponent implements OnInit, OnDestroy {
  users: User[];
  subscription: Subscription;
  gid: number;
  constructor(private groupsService: GroupService,
              private usersService: UsersService,
              private  route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.gid = +params['id'];
        }
      );

    this.subscription = this.usersService.groupUsersChanged
      .subscribe((users: User[]) => {
        this.users = users;
      });
    this.users = this.usersService.getGroupUsers(this.gid);
  }

  ngOnDestroy(): void {
  }

}
