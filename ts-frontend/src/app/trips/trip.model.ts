import {LocationModel} from './location.model';

export  class Trip {
  public id: number;
  public title: string;
  public startTime: number;
  public endTime: number;
  public distance: number;
  public userId: number;
  public locationsList: LocationModel[];


  constructor(id: number, title: string, startTime: number, endTime: number,
              distance: number, userId: number, locationsList: LocationModel[]) {
    this.id = id;
    this.title = title;
    this.startTime = startTime;
    this.endTime = endTime;
    this.distance = distance;
    this.userId = userId;
    this.locationsList = locationsList;
  }
}
