export  class LocationModel {
  public timestamp: string;
  public latitude: number;
  public longitude: number;

  constructor(timestamp: string, latitude: number, longitude: number) {
    this.timestamp = timestamp;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
