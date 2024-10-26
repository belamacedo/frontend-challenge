import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';
import { AccountsTableComponent } from './accounts-table/accounts-table.component';

@Component({
  selector: 'app-accounts-dashboard',
  standalone: true,
  imports: [DashboardHeaderComponent, AccountsTableComponent],
  templateUrl: './accounts-dashboard.component.html',
  styleUrl: './accounts-dashboard.component.scss',
})
export class AccountsDashboardComponent {}
