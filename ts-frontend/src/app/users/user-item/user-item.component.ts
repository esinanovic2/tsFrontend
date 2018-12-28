import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersService} from '../users.service';
import {GroupService} from '../../groups/group.service';
import {UserTypeService} from '../user-type.service';
import {RoleGuardService} from '../../auth/role-guard.service';


@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  @Input() index: number;

  role: string;
  userType: string;
  userGroup: string;

  constructor(private usersService: UsersService,
              private groupService: GroupService,
              private typeService: UserTypeService,
              private roleGuardService: RoleGuardService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.userGroup = this.user.grupaKorisnika.groupName; // this.groupService.getGroupName(this.user.grupaKorisnika.id);
    this.userType =  this.user.tipKorisnika.typeName; // this.typeService.getUserTypeName(this.user.userTypeId);
    this.role = this.roleGuardService.token.role;
  }

  onEdit() {
    this.router.navigate([this.user.id, 'edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.usersService.deleteUser(this.user.id);
    this.router.navigate(['/users']);
  }

  onDetails() {
    this.router.navigate([this.user.id], {relativeTo: this.route});
  }
}
