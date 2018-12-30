import {LocationModel} from './location.model';

export  class Trip {
  public id: number;
  public naziv: string;
  public start_time: number;
  public end_time: number;
  public distance: number;
  public idKorisnika: number;
  public locationsList: LocationModel[];


  constructor(id: number, naziv: string, start_time: number, end_time: number,
              distance: number, idKorisnika: number, locationsList: LocationModel[]) {
    this.id = id;
    this.naziv = naziv;
    this.start_time = start_time;
    this.end_time = end_time;
    this.distance = distance;
    this.idKorisnika = idKorisnika;
    this.locationsList = locationsList;
  }
}
