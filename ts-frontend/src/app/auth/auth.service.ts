import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {TokenModel} from './token.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = '';

  private authToken: TokenModel;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private router: Router) { }

  isAuthenticated() {
    return this.token !== '';
  }

  login() {
    this.token = 'Authenticated';
    this.router.navigate(['/']);
  }

  logout() {
    this.token = '';
    this.router.navigate(['/login']);
  }

  getToken() {
    this.token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOjEsIlVHcm91cCI6IkdydXBhMSIsInVzZXJfbmFtZSI6ImpCYXVlciIsI' +
      'nNjb3BlIjpbIm1vYmlsZSJdLCJVVHlwZSI6IkFETUlOIiwiZXhwIjoxNTQ1OTY2ODYwLCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl0sImp0aS' +
      'I6IjQ2MmNlNGIwLTlmOWYtNDJmOS04YjJiLTY1NDkxNTRmNTViNCIsImNsaWVudF9pZCI6ImNsaWVudCJ9.i4EvVDfokHuqgPFtDmwoa-acLwbwYS' +
      'iIq_Rc-5_duWfUSCcdLw9H17xsjOxhuU061snPfzpvZ9GIbazlLxEl1QQdWaqzvHZdZ28lklqxqKpWRFjgRhPwO9UkOSRHrHy8dTGZz_A9wZkV9Lw' +
      '5_U7_iEUA3YvdsJpKpO0l3-fcwqV7807GsEwjNwD1OVj4fAE5KueSJFxHYQGpO3_Svh0HAarXhL4uaMet7zIHaisnRMmnSZw-f-XwJ20Io0ktG8Kg' +
      'hq01Ifdthh0KzyVUzLNZYhtRPesC-8PAFVzkIUfnEXyly9WTDWGVsDG77Rpo5SYQRo60g-IJfZUUxf3Dd6KO7g';

    console.log('Decoded token', this.jwtHelper.decodeToken(this.token));

    return this.token;
  }

  private getTokenFromApi() {

  }
}
