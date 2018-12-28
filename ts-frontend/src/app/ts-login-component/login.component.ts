import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {UsersService} from '../users/users.service';
import {DataStorageService} from '../shared/data-storage.service';
import {TokenModel} from '../auth/token.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-ts-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private apiResponded = false;
  private loginSuccess = false;
  signInForm: FormGroup;
  loginURL = this.dataStorageService.hostIp + this.dataStorageService.portAndMs + 'oauth/token';
  dUser = new FormData();
// TODO Remove console logs
  dummyUser = {grant_type: 'password',
    scope: 'mobile',
    username: '',
    password: ''};

  constructor(private authService: AuthService,
              private dataStorageService: DataStorageService,
              private httpClient: HttpClient,
              private usersService: UsersService) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.signInForm);
    const username = this.signInForm.get('username').value;
    const password = this.signInForm.get('password').value;
    this.dummyUser.username = username;
    this.dummyUser.password = password;
    this.dUser = this.createTokenBodyFromStrings(this.dummyUser.grant_type,
      this.dummyUser.scope, this.dummyUser.username, this.dummyUser.password);
    this.getTokenApiCall();
  }

  getTokenApiCall() {
    this.apiResponded = false;
    this.httpClient.post<TokenModel>(this.loginURL, this.dUser,
      {
        headers: new HttpHeaders()
          .set('Access-Control-Allow-Origin', '*')
          .append('Authorization', 'Basic ' + btoa('client:secret'))
      })
      .subscribe(
        (token) => {
          this.authService.setToken(token);
          this.loginSuccess = true;
          this.apiResponded = true;
          this.authService.login();
          this.signInForm.reset();
        },
        (error1 => {
          console.log('Token error: ', error1);
          this.loginSuccess = false;
          this.apiResponded = true;
          this.authService.setToken(null);
        })
      );
  }

   private createTokenBodyFromStrings(grant_type: string, scope: string, username: string, password: string) {
    const formData = new FormData();

    formData.append('grant_type', grant_type);
    formData.append('scope', scope);
    formData.append('username', username);
    formData.append('password', password);

    return formData;
  }

}
