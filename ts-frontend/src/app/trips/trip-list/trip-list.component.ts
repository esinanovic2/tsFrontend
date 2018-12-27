import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Trip} from '../trip.model';
import {Router} from '@angular/router';
import {TripService} from '../trip.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit, OnDestroy {
  trips: Trip[];
  subscription: Subscription;
  constructor(private tripService: TripService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.tripService.tripsChanged
      .subscribe((trips: Trip[]) => {
        this.trips = trips;
      });
    this.trips = this.tripService.getTrips();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
