import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-ts-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm: FormGroup;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, this.usernameCheck.bind(this)]),
      'password': new FormControl(null, [Validators.required, this.passwordCheck.bind(this)])
    });
  }

  onSubmit() {
    console.log(this.signInForm);
    this.authService.login();
    this.signInForm.reset();
  }

  usernameCheck(control: FormControl): {[s: string]: boolean} {
    if ('validUser' !== control.value) {
      return {'usernameInvalid': true};
    }
    return null;
  }

  passwordCheck(control: FormControl): {[s: string]: boolean} {
    if ('validPassword' !== control.value) {
      return {'passwordInvalid': true};
    }
    return null;
  }
}
