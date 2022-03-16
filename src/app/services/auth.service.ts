import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private router: Router) {}

  login(email: string, password: string): boolean {
    const user: IUser = JSON.parse(
      localStorage.getItem('user') || '{}'
    ) as IUser;
    if (user.email === email && user.password === password) {
      localStorage.setItem(
        'user',
        JSON.stringify({ ...user, hasLoggedIn: true })
      );
      return true;
    } else {
      return false;
    }
  }

  isLoggedIn(): boolean {
    const user: IUser = JSON.parse(
      localStorage.getItem('user') || '{}'
    ) as IUser;
    return user.hasLoggedIn;
  }

  logOut(): void {
    const user: IUser = JSON.parse(
      localStorage.getItem('user') || '{}'
    ) as IUser;
    localStorage.setItem(
      'user',
      JSON.stringify({ ...user, hasLoggedIn: false })
    );
    this.router.navigate(['login']);
  }
}
