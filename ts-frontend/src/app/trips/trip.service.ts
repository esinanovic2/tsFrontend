import { Injectable } from '@angular/core';
import {LocationModel} from './location.model';
import {Trip} from './trip.model';
import {Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TripService {
  tripsChanged = new Subject<Trip[]>();

  private locations: LocationModel[] = [
    new LocationModel('2018-03-20T21:00:40.000+0000', 43.232345, 18.33332),
    new LocationModel('2018-03-20T21:00:41.000+0000', 43.332345, 18.43332),
    new LocationModel('2018-03-20T21:00:42.000+0000', 43.432345, 18.53332),
  ];

  private trips: Trip[] = [
      new Trip(1, 'P1', 1521579640, 15215816659, 15, 1,  this.locations),
      new Trip(2, 'P2', 1521579660, 15215816689, 16, 1,  this.locations),
      new Trip(3, 'P3', 1521579670, 15215816699, 17, 1,  this.locations),
    ];

  constructor() { }

  getTrips() {
    return this.trips.slice();
  }

  addTrip(trip: Trip) {
    this.trips.push(trip);
    this.tripsChanged.next(this.trips.slice());
  }

  setTrips(trips: Trip[]) {
    this.trips = trips;
    this.tripsChanged.next(this.trips.slice());
  }
}
