import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './auth/auth-guard.service';
import {LoginComponent} from './ts-login-component/login.component';
import {HomeComponent} from './home/home.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {RegisterComponent} from './register/register.component';
import {UsersListComponent} from './users/users-list/users-list.component';
import {RoleGuardService} from './auth/role-guard.service';
import {UserComponent} from './users/user/user.component';
import {GroupListComponent} from './groups/group-list/group-list.component';
import {GroupComponent} from './groups/group/group.component';
import {GroupEditComponent} from './groups/group-edit/group-edit.component';
import {GroupUsersComponent} from './groups/group-users/group-users.component';
import {TripListComponent} from './trips/trip-list/trip-list.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'users', component: UsersListComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin', 'user']}},
  {path: 'users/:id', component: UserComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin', 'user']} },
  {path: 'users/:id/trips', component: TripListComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin', 'user']}},
  {path: 'users/:id/edit', component: RegisterComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin', 'user']} },
  {path: 'groups', component: GroupListComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin', 'user']}},
  {path: 'groups/:id', component: GroupComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin', 'user']}},
  {path: 'groups/:id/users', component: GroupUsersComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin', 'user']}},
  {path: 'groups/:id/edit', component: GroupEditComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin']}},
  {path: 'addGroup', component: GroupEditComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin']}},

  { path: 'login', component: LoginComponent},
  { path: 'logout', redirectTo: '/login', canActivate: [AuthGuardService]},
  { path: 'register', component: RegisterComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin']} },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' } // this needs to be the last route
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
