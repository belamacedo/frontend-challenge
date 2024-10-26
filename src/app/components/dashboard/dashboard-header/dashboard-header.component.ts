import { Component, OnInit } from '@angular/core';
import { RandomUserService } from '../../../core/services/random-user.service';

import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent implements OnInit {
  constructor(
    private randomUserService: RandomUserService,
    private authService: AuthService,
    private router: Router
  ) {}

  randomUserAvatar: string = '';
  userName: string = '';

  ngOnInit() {
    this.getRandomUser();
  }

  getRandomUser() {
    this.randomUserService.getRandomUser().subscribe((data) => {
      const user = data.results[0];
      this.randomUserAvatar = user.picture.thumbnail;
      this.userName = `${user.name.first} ${user.name.last}`;
    });
  }

  navigateToAccounts() {
    this.router.navigate(['/accounts']);
  }

  logout() {
    this.authService.logout();
  }
}
