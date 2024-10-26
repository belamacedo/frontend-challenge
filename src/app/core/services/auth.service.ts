import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);

  private readonly validUser = {
    email: 'usuario@gmail.com',
    password: 'usuario',
  };

  constructor(private router: Router) {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    if (savedAuthState) {
      this.isAuthenticated$.next(JSON.parse(savedAuthState));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    if (
      email === this.validUser.email &&
      password === this.validUser.password
    ) {
      this.isAuthenticated$.next(true);
      localStorage.setItem('isAuthenticated', 'true');
      return of(true);
    } else {
      return of(false);
    }
  }

  logout() {
    localStorage.setItem('isAuthenticated', 'false');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }
}
