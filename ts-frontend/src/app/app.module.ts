import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './ts-login-component/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from './auth/auth.service';
import {AuthGuardService} from './auth/auth-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RegisterComponent } from './register/register.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UserComponent } from './users/user/user.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { GroupItemComponent } from './groups/group-item/group-item.component';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';
import { GroupComponent } from './groups/group/group.component';
import {UsersService} from './users/users.service';
import {RoleGuardService} from './auth/role-guard.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { GroupUsersComponent } from './groups/group-users/group-users.component';
import { GroupUserItemComponent } from './groups/group-users/group-user-item/group-user-item.component';
import { TripListComponent } from './trips/trip-list/trip-list.component';
import { TripListItemComponent } from './trips/trip-list/trip-list-item/trip-list-item.component';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    ErrorPageComponent,
    RegisterComponent,
    UsersListComponent,
    UserComponent,
    UserItemComponent,
    UserEditComponent,
    GroupListComponent,
    GroupItemComponent,
    GroupEditComponent,
    GroupComponent,
    DropdownDirective,
    GroupUsersComponent,
    GroupUserItemComponent,
    TripListComponent,
    TripListItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthService, AuthGuardService, UsersService, RoleGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
