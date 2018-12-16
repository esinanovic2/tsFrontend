import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuardService} from './auth/auth-guard.service';
import {LoginComponent} from './ts-login-component/login.component';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  // { path: 'recipes', component: ,
  //   children: [
  //     {path : '', component: },
  //     {path: 'new', component: , canActivate: [AuthGuardService]},
  //     {path: ':id', component: },
  //     {path: ':id/edit', component: , canActivate: [AuthGuardService]},
  //   ]},
  { path: 'login', component: LoginComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
