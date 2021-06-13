import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router} from '@angular/router';
import {JWTService} from '../shared/utils/JWTtoken.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivateChild {

  constructor(private router: Router, public jwtService: JWTService) {
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.expectedRole as string;
    if (this.jwtService.hasToken() && expectedRole && this.jwtService.hasRole(expectedRole)) {

      return true;
    }

    this.router.navigate(['/']);
    return false;
  }

}
