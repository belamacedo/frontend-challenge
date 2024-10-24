import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RandomUserService } from '../../services/random-user.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent implements OnInit {
  constructor(private randomUserService: RandomUserService) {}

  randomUserAvatar: string = '';
  userName: string = '';

  ngOnInit() {
    this.getRandomUser();
  }

  getRandomUser() {
    this.randomUserService.getRandomUser().subscribe((data) => {
      console.log(data);
      const user = data.results[0];
      this.randomUserAvatar = user.picture.thumbnail;
      this.userName = `${user.name.first} ${user.name.last}`;
    });
  }
}
