import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../users/user.model';
import {UserTypeService} from '../../../users/user-type.service';

@Component({
  selector: 'app-group-user-item',
  templateUrl: './group-user-item.component.html',
  styleUrls: ['./group-user-item.component.css']
})
export class GroupUserItemComponent implements OnInit {
  @Input() user: User;
  @Input() index: number;

  userTypeName = '';

  constructor(private userTypeService: UserTypeService) { }

  ngOnInit() {
    this.userTypeName = this.userTypeService.getUserTypeName(this.user.tipKorisnika.id);
  }

}
