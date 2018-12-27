import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../trip.model';


@Component({
  selector: 'app-trip-list-item',
  templateUrl: './trip-list-item.component.html',
  styleUrls: ['./trip-list-item.component.css']
})
export class TripListItemComponent implements OnInit {
  @Input() trip: Trip;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
