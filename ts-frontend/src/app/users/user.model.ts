import {GroupModel} from '../groups/group.model';
import {UserTypeModel} from './user-type.model';

export  class User {
  public id: number;
  public fullName: string;
  public username: string;
  public email: string;
  public grupaKorisnika: GroupModel;
  public tipKorisnika: UserTypeModel;


  constructor(id: number, fullName: string, username: string, email: string, grupaKorisnika: GroupModel, tipKorisnika: UserTypeModel) {
    this.id = id;
    this.fullName = fullName;
    this.username = username;
    this.email = email;
    this.grupaKorisnika = grupaKorisnika;
    this.tipKorisnika = tipKorisnika;
  }
}
