import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {decode} from 'punycode';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
   token = {'role': ''};

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;

    // this.token = localStorage.getItem('token');
    this.token = {'role': 'admin'};
    console.log(this.token.role);
    console.log(expectedRole[0] + '  -  ' + expectedRole[1]);


    // decode the token to get its payload - when we implement tokens
    // const tokenPayload = decode(token);

    if (this.authService.isAuthenticated() && (this.token.role === expectedRole[0] || this.token.role === expectedRole[1])) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
