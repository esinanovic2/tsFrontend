import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserTypeModel} from '../users/user-type.model';
import {UserTypeService} from '../users/user-type.service';
import {Subscription} from 'rxjs';
import {GroupModel} from '../groups/group.model';
import {GroupService} from '../groups/group.service';
import {UsersService} from '../users/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../users/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  userTypes: UserTypeModel[];
  userGroups: GroupModel[];
  selectedGroup: GroupModel;
  selectedType: UserTypeModel;
  subscription: Subscription;

  constructor(private usersService: UsersService,
              private userTypesService: UserTypeService,
              private groupService: GroupService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.userTypesService.usersChanged
      .subscribe((userTypes: UserTypeModel[]) => {
        this.userTypes = userTypes;
      });
    this.userTypes = this.userTypesService.getUserTypes();
    this.selectedType = this.userTypes[0];

    this.subscription = this.groupService.groupsChanged
      .subscribe((groups: GroupModel[]) => {
        this.userGroups = groups;
      });
    this.userGroups = this.groupService.getGroups();
    this.selectedGroup = this.userGroups[0];

    this.registerForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'lastName': new FormControl(null, [Validators.required, Validators.maxLength(30)] ),
      'username': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'repeatPassword': new FormControl(null, [Validators.required]),
      'userTypeId': new FormControl(this.selectedType, [Validators.required]),
      'userGroupId': new FormControl(this.selectedGroup, [Validators.required]),
    });
  }

  onSubmit() {
    const tempUser = new User(null, this.registerForm.get('firstName').value, this.registerForm.get('lastName').value,
      this.registerForm.get('username').value, this.registerForm.get('password').value, this.registerForm.get('email').value,
      this.registerForm.get('userTypeId').value.id, this.registerForm.get('userGroupId').value.id, null);
    this.usersService.addUser(tempUser);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
