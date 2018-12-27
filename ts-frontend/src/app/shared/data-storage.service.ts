import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {User} from '../users/user.model';
import {Http, Response} from '@angular/http';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GroupModel} from '../groups/group.model';
import {UsersService} from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  hostIp = 'http://192.168.0.17';
  usersURL = this.hostIp + ':8090/korisnici_ms/users/';
  tokenUrl = this.hostIp + ':8090/korisnici_ms/oauth/token/';
  tokenHeader: Headers;
  corsHeader: Headers;
  header: Headers;
  token: string;

  dummyUser = {grant_type: 'password',
               scope: 'mobile',
               username: 'jBauer',
               password: 1234};

  constructor(private authService: AuthService,
              private http: Http,
              private httpClient: HttpClient,
              private usersService: UsersService
              ) {
    this.tokenHeader = new Headers({'Authorization': 'Basic' + btoa('client: secret')});
    this.token = authService.getToken();
    this.header = new Headers({'Authorization': 'Bearer ' + this.token});
    this.corsHeader = new Headers({'Access-Control-Allow-Origin': '*'});
    this.getAllUsersClient();
    this.getToken();
  }

  ////////////// USERS \\\\\\\\\\\\\

  getToken() {
    // @ts-ignore
    this.http.post(this.tokenUrl, this.dummyUser, {headers: [this.tokenHeader]})
      .subscribe(
        (response: Response) => {
          return console.log('Token response:', response);
        });
  }

  getAllUsersClient() {
    this.httpClient.get<User[]>(this.usersURL,
      {
        headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*')
          .append('Authorization', 'Bearer ' + this.token)
      })
      .subscribe(
        (users: User[]) => {
            console.log('Client', users);
            this.usersService.setUsers(users);
            // return users;
        },
        (error1 => {
          console.log('HttpClient error: ', error1);
        })
      );
    // return null;
  }

  getAllUsers(): User[] {
    // // @ts-ignore
    // this.http.get(this.usersURL, {headers: [this.header, this.header, this.corsHeader]}).pipe(
    //   map(
    //     (response: Response) => {
    //       console.log(response);
    //       return response.json();
    //     }
    //   ))
    //   .subscribe(
    //     (users: User[]) => {
    //       console.log(users);
    //       return users;
    //     }
    //   );
    //
    return null;
  }

  getUsersInAGroup (gid: number) {

  }

  addUser(newUser: User) {

  }

  updateUser(id: number, newUser: User) {

  }

  getUserById(id: number) {

  }

  getUserByUsername(username: string) {

  }

  deleteUser(id: number) {

  }

  ////////////// GROUPS \\\\\\\\\\\\\

  getAllGroups() {

  }

  getGroupById(id: number) {

  }

  getGroupByName(name: string) {

  }

  addGroup(newGroup: GroupModel) {

  }

  updateGroup(id: number) {

  }

  deleteGroup(id: number) {

  }
  ////////////// TYPES \\\\\\\\\\\\\

  getAllTypes() {

  }

  getTypeById(id: number) {

  }

  ////////////// TRIPS \\\\\\\\\\\\\

  getTripsByUserId(id: number) {

  }
}
