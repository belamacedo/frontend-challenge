import { Component } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IAccount } from '../../interfaces/IAccount';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, CommonModule],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent {
  currentUser$: Observable<IAccount | null>;
  constructor(private authService: AuthService, private router: Router) {
    this.currentUser$ = this.authService.getCurrentUserObservable();
  }

  avatar: string = '';
  userName: string = '';

  ngOnInit() {
    this.currentUser$.subscribe((currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        this.userName = currentUser.name.trim();
        this.avatar = currentUser.img;
      }
    });
  }

  navigateToAccounts() {
    this.router.navigate(['/accounts']);
  }

  navigateToPayments() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.logout();
  }
}
