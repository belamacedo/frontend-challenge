import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IAccount } from '../../interfaces/IAccount';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private api = 'http://localhost:3030/accounts';

  constructor(private router: Router, private http: HttpClient) {
    const savedAuthState = localStorage.getItem('isAuthenticated');
    if (savedAuthState) {
      this.isAuthenticated$.next(JSON.parse(savedAuthState));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<IAccount[]>(this.api).pipe(
      map((accounts) => {
        const validUser = accounts.find(
          (account) => account.email === email && account.password === password
        );
        if (validUser) {
          this.isAuthenticated$.next(true);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('currentUser', JSON.stringify(validUser));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout() {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  getCurrentUser(): IAccount | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
}
