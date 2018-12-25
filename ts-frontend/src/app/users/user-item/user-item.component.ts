import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../users.service';
import {GroupService} from "../../groups/group.service";
import {UserTypeService} from "../user-type.service";


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  @Input() index: number;

  userType: string;
  userGroup: string;

  constructor(private usersService: UsersService,
              private groupService: GroupService,
              private typeService: UserTypeService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.userGroup = this.groupService.getGroupName(this.user.userGroupId);
    this.userType = this.typeService.getUserTypeName(this.user.userTypeId);
  }

  onEdit() {
    console.log('On Edit user: ' + this.index);
    this.router.navigate([this.index, 'edit'], {relativeTo: this.route});
  }

  onDelete() {
    console.log('On Delete user: ' + this.index);
    this.usersService.deleteUser(this.index);
    this.router.navigate(['/users']);
  }

  onDetails() {
    console.log('On user details: ' + this.index);
    this.router.navigate([this.index], {relativeTo: this.route});
  }
}
