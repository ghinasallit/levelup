import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {DataService} from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public jwtHelper: JwtHelperService ) {}
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token_levelup') ?  this.jwtHelper.decodeToken(localStorage.getItem('auth_token_levelup')).sub : '' ;
    if (token){
      return true;
    }
    return false;
  }
}
