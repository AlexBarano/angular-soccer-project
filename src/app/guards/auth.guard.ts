import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const user: IUser = JSON.parse(
      localStorage.getItem('user') || '{}'
    ) as IUser;

    if (user.hasLoggedIn) {
      return true;
    }
    // this will prevent a bug which will show the path '/' without redirecting to login
    this.router.navigate(['login']);
    return false;
  }
}
