import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = '';

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
}
