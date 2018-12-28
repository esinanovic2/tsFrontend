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
    this.token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOjEsIlVHcm91cCI6IkdydXBhMSIsInVzZXJfbmFtZSI6ImpCYXVlciIsInNjb3BlIjpbIm1vYmlsZSJdLCJVVHlwZSI6IkFETUlOIiwiZXhwIjoxNTQ2MDQ4MTc2LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl0sImp0aSI6IjVlMTk2MmI1LTcxMjQtNDA5ZC1iNjExLTAyNWZmOTllNjA0OSIsImNsaWVudF9pZCI6ImNsaWVudCJ9.mwAYNmLigfxX4OvXVHY0Pa7XD5B4yjBGB9GPwag5ifeSLQvZ05m-b2XrkpiTWdoYixdC6IE2Ydksra1Bg7ZOQmW5lQcttCuIUt63tOFDpsYIRfrPQ3a7hCRerWECaofQof86w08zDmRu_6lupBzwutaTSWc0xhRiXACykdUX-zc5KDXtyXXy8Hpwe71BxEc2zl12ieDlp6baV_wA1Q6oVaYx3lFX6o3BwKFZ8t6eLBwHxTwgrYPQP7VHt04ja1WLaZZDyNwHL4bpdZfdfmNb7OoUnwQeuwpyP0pE2OhEJDy4zY_6LecDCcG-M5K5mmnINyhQWdHUHNpHn8x5gLz7Ug';

    console.log('Decoded token', this.jwtHelper.decodeToken(this.token));

    return this.token;
  }

  private getTokenFromApi() {

  }
}
