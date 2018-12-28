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
    this.token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVSUQiOjEsIlVHcm91cCI6IkdydXBhMSIsInVzZXJfbmFtZSI6ImpCYXVlciIsInNjb3BlIjpbIm1vYmlsZSJdLCJVVHlwZSI6IkFETUlOIiwiZXhwIjoxNTQ2MDY5Mzk1LCJhdXRob3JpdGllcyI6WyJST0xFX0FETUlOIl0sImp0aSI6IjgyMTY3ODQyLWJjNDUtNGFkYy04ZTM4LTMzZWVjYTc2YWQ4OSIsImNsaWVudF9pZCI6ImNsaWVudCJ9.keG9E-Tv5lrFrE_vK81r5SalR8vB8LCtiF9fnVswdLCeZ2thVymw7Gz3h798_r4L9-eA0RRQIhNEy9fUGppWIXyOpbSRGC74gjq3xJatw8wBtBqFJOtRYKLA9TYIcyu_2367OHAw2ShliMcyCDhsd45IzXWFt9SHPodgQcB4n1fAZqC8YwMB8dzEq3K9Zz4tKEkrtcnHmLVFUOW_LpwpWOcEkuSAyGpeXK8Hmt_pYqGRfRiVJKwJzVk8Qqe-T2DJwaLqbOCQ0Pnds0M_dZwNW08bHUPIfNgpMtl9zmbI1cNosFcg_Or4ZbRF28qrmJlvPlYhfwq1G71eWT0HVZazfA';

    console.log('Decoded token', this.jwtHelper.decodeToken(this.token));

    return this.token;
  }

  private getTokenFromApi() {

  }
}
