import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class JWTService {
  // tslint:disable-next-line:variable-name
  myRawToken = localStorage.getItem('auth_token');
  helper = new JwtHelperService();
  decodedToken: any;
  roles: string[] = [];
  expirationDate: Date;
  tokenIsExpired = true;

  constructor() {
    this.initialise();
  }

  initialise() {
    this.myRawToken = localStorage.getItem('auth_token');
    if (this.myRawToken) {
      this.decodedToken = this.helper.decodeToken(this.myRawToken);
      this.expirationDate = this.helper.getTokenExpirationDate(this.myRawToken);
      this.tokenIsExpired = this.helper.isTokenExpired(this.myRawToken);
      this.roles = this.decodedToken.roles ? this.decodedToken.roles : [];
    }
  }

  getDecodedToken(): {} {
    this.initialise();
    return this.decodedToken;
  }

  isExpired(): boolean {
    this.initialise();
    return this.tokenIsExpired;
  }

  hasToken(): boolean {
    this.initialise();
    return this.myRawToken ? this.myRawToken.length > 0 : false;
  }

  getRoles(): string[] {
    this.initialise();
    return this.roles;
  }

  hasRole(role: string): boolean {
    this.initialise();
    return this.roles.includes(role);
  }

  containRoles(roles: string[]): boolean {
    this.initialise();
    return roles.every(elem => this.roles.indexOf(elem) > -1);
  }

  IsAdmin(): boolean {
    this.initialise();
    return this.roles.includes('Admin');
  }

  IsWebMaster(): boolean {
    this.initialise();
    return this.roles.includes('WebMaster');
  }

  getAccountType() {
    return this.decodedToken.accountType;
  }

  expiryDate() {
    this.initialise();
    return this.expirationDate;
  }
}
