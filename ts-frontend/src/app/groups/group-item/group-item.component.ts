import {Component, Input, OnInit} from '@angular/core';
import {GroupModel} from '../group.model';
import {GroupService} from '../group.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleGuardService} from '../../auth/role-guard.service';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() group: GroupModel;
  @Input() index: number;
  role: string;

  constructor(private groupService: GroupService,
              private roleGuardService: RoleGuardService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.role = this.roleGuardService.token.role;
  }

  onUsers() {
    this.router.navigate([this.group.id, 'users'], {relativeTo: this.route});
  }

  onEdit() {
    this.router.navigate([this.group.id, 'edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.groupService.deleteGroup(this.group.id);
    this.router.navigate(['/groups']);
  }
}
