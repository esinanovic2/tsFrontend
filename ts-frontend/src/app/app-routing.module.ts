import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './auth/auth-guard.service';
import {LoginComponent} from './ts-login-component/login.component';
import {HomeComponent} from './home/home.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {RegisterComponent} from './register/register.component';
import {UsersListComponent} from './users/users-list/users-list.component';
import {RoleGuardService} from './auth/role-guard.service';
import {UserEditComponent} from './users/user-edit/user-edit.component';
import {UserComponent} from './users/user/user.component';
import {GroupListComponent} from './groups/group-list/group-list.component';
import {GroupComponent} from './groups/group/group.component';
import {GroupEditComponent} from './groups/group-edit/group-edit.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'users', component: UsersListComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin', 'user']}},
  {path: 'users/:id', component: UserComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin', 'user']} },
  {path: 'users/:id/edit', component: UserEditComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin', 'user']} },
  {path: 'groups', component: GroupListComponent, canActivate: [RoleGuardService], data: { expectedRole: ['admin']},
    children: [
      {path: ':id', component: GroupComponent, canActivate: [RoleGuardService],
        data: { expectedRole: ['admin']} },
      {path: ':id/users', component: UsersListComponent, canActivate: [RoleGuardService],
        data: { expectedRole: ['admin']} },
      {path: ':id/edit', component: GroupEditComponent, canActivate: [RoleGuardService],
        data: { expectedRole: ['admin']} },
    ]},
  { path: 'login', component: LoginComponent},
  { path: 'logout', redirectTo: '/login', canActivate: [AuthGuardService]},
  { path: 'register', component: RegisterComponent},
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'} },
  { path: '**', redirectTo: '/not-found' } // this needs to be the last route
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
