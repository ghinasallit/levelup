import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JWTService } from '../shared/utils/JWTtoken.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public jwtService: JWTService) {}

  canActivate() {

    if (this.jwtService.isExpired()) {
      this.router.navigate(['/']);

      return false;
    }

    return true;
  }
}
