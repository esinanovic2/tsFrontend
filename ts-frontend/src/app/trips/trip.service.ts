import { Injectable } from '@angular/core';
import {LocationModel} from './location.model';
import {Trip} from './trip.model';
import {Subject} from 'rxjs';
import {DataStorageService} from "../shared/data-storage.service";
import {GroupModel} from "../groups/group.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UsersService} from "../users/users.service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class TripService {
  getAllByUserURL = DataStorageService.hostIp + DataStorageService.portAndTripsService + 'by-user/';

  tripsChanged = new Subject<Trip[]>();

  private locations: LocationModel[] = [
/*    new LocationModel('2018-03-20T21:00:40.000+0000', 43.232345, 18.33332),
    new LocationModel('2018-03-20T21:00:41.000+0000', 43.332345, 18.43332),
    new LocationModel('2018-03-20T21:00:42.000+0000', 43.432345, 18.53332),*/
  ];

  private userTrips: Trip[] = [
/*      new Trip(1, 'P1', 1521579640, 15215816659, 15, 1,  this.locations),
      new Trip(2, 'P2', 1521579660, 15215816689, 16, 1,  this.locations),
      new Trip(3, 'P3', 1521579670, 15215816699, 17, 1,  this.locations),*/
    ];

  constructor(private tripService: TripService,
              private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router) {}


  getTrips() {
    return this.userTrips.slice();
  }

  getAllByUser(id:number) {
    this.httpClient.get<Trip[]>(this.getAllByUserURL + id,
      {
        headers: new HttpHeaders()
          .set('Authorization', 'Bearer ' + this.authService.getToken().access_token)
          .append('Access-Control-Allow-Origin', '*')
      })
      .subscribe(
        (trips: Trip[]) => {
          this.userTrips = trips;
          this.tripsChanged.next(this.userTrips);
        },
        (error1 => {

        })
      );
    return this.userTrips;
  }

  addTrip(trip: Trip) {
    this.userTrips.push(trip);
    this.tripsChanged.next(this.userTrips.slice());
  }

  setTrips(trips: Trip[]) {
    this.userTrips = trips;
    this.tripsChanged.next(this.userTrips.slice());
  }
}
