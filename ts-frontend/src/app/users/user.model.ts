export  class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public userTypeId: number;
  public userGroupId: number;
  public deviceId: number;


  constructor(id: number, firstName: string, lastName: string, username: string,
              userTypeId: number, userGroupId: number, deviceId: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.userTypeId = userTypeId;
    this.userGroupId = userGroupId;
    this.deviceId = deviceId;
  }
}
