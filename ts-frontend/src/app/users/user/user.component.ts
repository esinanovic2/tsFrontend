import { Component, OnInit } from '@angular/core';
import {User} from '../user.model';
import {UsersService} from '../users.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GroupService} from '../../groups/group.service';
import {UserTypeService} from '../user-type.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  id: number;
  userType: string;
  userGroup: string;
  constructor(private usersService: UsersService,
              private groupService: GroupService,
              private typeService: UserTypeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        console.log('User component on init subscribe');
        this.id = +params['id'];
        this.user = this.usersService.getUser(this.id);
      }
    );

    this.userGroup = this.user.grupaKorisnika.groupName; // this.groupService.getGroupName(this.user.userGroupId);
    this.userType = this.user.tipKorisnika.typeName; // this.typeService.getUserTypeName(this.user.userTypeId);
  }

  onTrips() {
    this.router.navigate(['trips'], {relativeTo: this.route});
  }
}
