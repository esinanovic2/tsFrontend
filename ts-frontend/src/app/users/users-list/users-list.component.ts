import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../user.model';
import {Subscription} from 'rxjs';
import {UsersService} from '../users.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[];
  subscription: Subscription;
  constructor(private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.usersService.usersChanged
      .subscribe((users: User[]) => {
        this.users = users;
        });
    this.users = this.usersService.getUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddUser() {
    this.router.navigate( ['register']);
  }
}
