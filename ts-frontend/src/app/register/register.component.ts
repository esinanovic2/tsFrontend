import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserTypeModel} from '../users/user-type.model';
import {UserTypeService} from '../users/user-type.service';
import {Subscription} from 'rxjs';
import {GroupModel} from '../groups/group.model';
import {GroupService} from '../groups/group.service';
import {UsersService} from '../users/users.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../users/user.model';
import {RoleGuardService} from '../auth/role-guard.service';

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
  editMode = false;
  id: number;
  role: string;

  constructor(private usersService: UsersService,
              private userTypesService: UserTypeService,
              private groupService: GroupService,
              private roleGueardService: RoleGuardService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.groupService.setGroups();
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

    this.role = this.roleGueardService.token.role;

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  private initForm() {
    let firstName = '';
    let lastName = '';
    let username = '';
    let email = '';
    let password = '';

    if (this.editMode) {
      this.usersService.getUser(this.id);
      // this.subscription = this.usersService.tempUserChanged.subscribe((user: User) => {
      //   if (user === null) {
      //     alert('User can\'t be edited at the moment');
      //     this.router.navigate(['/users']);
      //   }
      //   const fullName = user.fullName.split(' ');
      //   firstName = fullName[0];
      //   lastName = fullName[1];
      //   username = user.username;
      //   email = user.email;
      //   password = '';
      //   this.selectedType = this.userTypesService.getUserType(user.tipKorisnika.id);
      //   this.selectedGroup = this.groupService.getGroup(user.grupaKorisnika.id);
      // });
      const user = this.usersService.getLocalUser(this.id);
      const fullName = user.fullName.split(' ');
      firstName = fullName[0];
      lastName = fullName[1];
      username = user.username;
      email = user.email;
      password = '';
      this.selectedType = this.userTypesService.getUserType(user.tipKorisnika.id);
      this.selectedGroup = this.groupService.getGroup(user.grupaKorisnika.id);
    }

    if (this.editMode && this.role === 'admin') {
      this.initAdminEditForm(firstName, lastName);
    } else if (this.editMode && this.role === 'user') {
      this.initUserEditForm(firstName, lastName, username, email, password);
    } else {
      this.initRegisterForm();
    }
  }

  initRegisterForm() {
    this.registerForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      'lastName': new FormControl(null, [Validators.required, Validators.maxLength(30)] ),
      'username': new FormControl(null, [Validators.required, Validators.maxLength(30), this.uniqueUserName.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required]),
      'userTypeId': new FormControl(this.selectedType, [Validators.required]),
      'userGroupId': new FormControl(this.selectedGroup, [Validators.required]),
    });
  }

  private initAdminEditForm(firstName: string, lastName: string) {
    this.registerForm = new FormGroup({
      'firstName': new FormControl(firstName, [Validators.required, Validators.maxLength(30)]),
      'lastName': new FormControl(lastName, [Validators.required, Validators.maxLength(30)] ),
      'userTypeId': new FormControl(this.selectedType, [Validators.required]),
      'userGroupId': new FormControl(this.selectedGroup, [Validators.required]),
    });
  }

  private initUserEditForm(firstName: string, lastName: string, username: string, email: string, password: string) {
    this.registerForm = new FormGroup({
      'firstName': new FormControl(firstName, [Validators.required, Validators.maxLength(30)]),
      'lastName': new FormControl(lastName, [Validators.required, Validators.maxLength(30)] ),
      'username': new FormControl(username, [Validators.required, Validators.maxLength(30)]),
      'email': new FormControl(email, [Validators.required, Validators.email]),
      'password': new FormControl(password, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.editMode && this.role === 'user') {
      // this.usersService.getUser(this.id);
      // this.subscription = this.usersService.tempUserChanged.subscribe((tempUser: User) => {
      //   if (tempUser === null) {
      //     alert('User can\'t be edited at the moment');
      //     return;
      //   }
      //   tempUser.fullName = this.registerForm.get('firstName').value
      //     + ' ' + this.registerForm.get('lastName').value;
      //   tempUser.username = this.registerForm.get('username').value;
      //   tempUser.email = this.registerForm.get('email').value;
      //   this.usersService.updateUserFromUser(this.id, tempUser, this.registerForm.get('password').value);
      // });

      const tempUser = this.usersService.getLocalUser(this.id);

      tempUser.fullName = this.registerForm.get('firstName').value
        + ' ' + this.registerForm.get('lastName').value;
      tempUser.username = this.registerForm.get('username').value;
      tempUser.email = this.registerForm.get('email').value;
      this.usersService.updateUserFromUser(this.id, tempUser, this.registerForm.get('password').value);

    } else if (this.editMode && this.role === 'admin') {
      // this.usersService.getUser(this.id);
      // this.subscription = this.usersService.tempUserChanged.subscribe((tempUser: User) => {
      //   if (tempUser === null) {
      //     alert('User can\'t be edited at the moment');
      //     return;
      //   }
      //   tempUser.fullName = this.registerForm.get('firstName').value
      //     + ' ' + this.registerForm.get('lastName').value;
      //   tempUser.tipKorisnika = this.registerForm.get('userTypeId').value;
      //   tempUser.grupaKorisnika = this.registerForm.get('userGroupId').value;
      //   this.usersService.updateUserFromAdmin(this.id, tempUser, this.registerForm.get('password').value);
      // });
      const tempUser = this.usersService.getLocalUser(this.id);

      tempUser.fullName = this.registerForm.get('firstName').value
        + ' ' + this.registerForm.get('lastName').value;
      tempUser.tipKorisnika = this.registerForm.get('userTypeId').value;
      tempUser.grupaKorisnika = this.registerForm.get('userGroupId').value;
      this.usersService.updateUserFromAdmin(this.id, tempUser, '');

    } else {
      const tempUser = new User(null,
        this.registerForm.get('firstName').value + ' ' + this.registerForm.get('lastName').value,
        this.registerForm.get('username').value, this.registerForm.get('email').value,
        this.registerForm.get('userTypeId').value, this.registerForm.get('userGroupId').value);
        this.usersService.addUserApi(tempUser, this.registerForm.get('password').value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/users']);
    location.reload();
  }

  uniqueUserName(control: FormControl): {[s: string]: boolean} {
    if (this.usersService.checkUsernameExists(control.value)) {
      return {'usernameMustBeUnique': true};
    }
    return null;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
