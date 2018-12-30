import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Trip} from '../trip.model';
import {Router} from '@angular/router';
import {TripService} from '../trip.service';
import {UsersService} from "../../users/users.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit, OnDestroy {
  trips: Trip[];
  subscription: Subscription;
  authService:AuthService;
  constructor(private tripService: TripService,
              private authServiceConst: AuthService,
              private router: Router) {
    this.authService = authServiceConst;
  }

  ngOnInit() {
    this.trips = this.tripService.getAllByUser(this.authService.getLoggedInUserId());

    this.subscription = this.tripService.tripsChanged
      .subscribe((trips: Trip[]) => {
        this.trips = trips;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
