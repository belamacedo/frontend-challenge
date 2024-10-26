import { Component } from '@angular/core';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, CommonModule],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  avatar: string = '';
  userName: string = '';

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userName = `${currentUser.name}`;
      this.avatar = currentUser.img;
    }
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
