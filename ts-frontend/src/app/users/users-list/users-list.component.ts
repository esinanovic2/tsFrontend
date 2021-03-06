import {Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {User} from '../user.model';
import {Subscription} from 'rxjs';
import {UsersService} from '../users.service';
import {Router} from '@angular/router';
import {RoleGuardService} from '../../auth/role-guard.service';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[];
  subscription: Subscription;
  role: string;
  constructor(private usersService: UsersService,
              private dataStorageService: DataStorageService,
              private roleGuardService: RoleGuardService,
              private router: Router) { }

  ngOnInit() {
    this.role = this.roleGuardService.token.role;
    console.log('ROLE: ' + this.role);
    if (this.role === 'admin') {
      this.usersService.getUsers();
      this.subscription = this.usersService.usersChanged
        .subscribe((users: User[]) => {
          this.users = users;
        });
    } else if (this.role === 'user') {
      this.usersService.setLoggedInUser();
      this.subscription = this.usersService.usersChanged
        .subscribe((users: User[]) => {
          this.users = users;
        });
      this.users = this.usersService.getLoggedInUser();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddUser() {
    this.router.navigate( ['register']);
  }
}
