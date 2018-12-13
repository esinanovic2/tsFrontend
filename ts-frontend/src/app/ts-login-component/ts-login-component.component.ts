import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ts-login-component',
  templateUrl: './ts-login-component.component.html',
  styleUrls: ['./ts-login-component.component.css']
})
export class TsLoginComponentComponent implements OnInit {
  signInForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, this.usernameCheck.bind(this)]),
      'password': new FormControl(null, [Validators.required, this.passwordCheck.bind(this)])
    });
  }

  onSubmit() {
    console.log(this.signInForm);
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
