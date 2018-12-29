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

    const expectedRole = route.data.expectedRole;

    const lInUserRole = this.authService.getLoggedInUserRole().toLowerCase();
    this.token = {'role': lInUserRole};

    if (this.authService.isAuthenticated() && (this.token.role === expectedRole[0] || this.token.role === expectedRole[1])) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
