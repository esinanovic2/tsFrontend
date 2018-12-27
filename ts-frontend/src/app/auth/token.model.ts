export class TokenModel {
  public access_token: string;
  public token_type: string;
  public refresh_token: string;
  public expires_in: number;
  public scope: string;
  public UID: number;
  public UGroup: string;
  public UType: string;
  public jti: string;


  constructor(access_token: string, token_type: string, refresh_token: string,
              expires_in: number, scope: string, UID: number, UGroup: string,
              UType: string, jti: string) {
    this.access_token = access_token;
    this.token_type = token_type;
    this.refresh_token = refresh_token;
    this.expires_in = expires_in;
    this.scope = scope;
    this.UID = UID;
    this.UGroup = UGroup;
    this.UType = UType;
    this.jti = jti;
  }
}
