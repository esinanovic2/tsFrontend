import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {TokenModel} from './token.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null;
  private loggedInUserRole = null;
  private loggedInUserId = null;
  private authToken: TokenModel;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router) {
    this.authToken = JSON.parse(localStorage.getItem('authToken'));
    if (this.authToken !== null) {
      this.loggedInUserId = this.authToken.UID;
      this.loggedInUserRole = this.authToken.UType;
    }
  }

  isAuthenticated() {
    return this.authToken !== null && this.authToken.expires_in > 0;
  }

  login() {
    this.loggedInUserId = this.authToken.UID;
    this.loggedInUserRole = this.authToken.UType;
    localStorage.setItem('authToken', JSON.stringify(this.authToken));
    this.router.navigate(['/']);
  }

  logout() {
    this.loggedInUserId = null;
    this.loggedInUserRole = null;
    this.authToken.expires_in = 0;
    this.authToken = null;
    localStorage.setItem('authToken', JSON.stringify(this.authToken));
    localStorage.clear();
    this.token = null;
    this.router.navigate(['/login']);
  }

  getLoggedInUserId() {
    return this.loggedInUserId;
  }

  getLoggedInUserRole() {
    return this.loggedInUserRole;
  }
// TODO remove if unnecessary
  getToken() {
    return this.authToken;
  }

  setToken(newAuthToken: TokenModel) {
    this.authToken = newAuthToken;
  }
}
