import { Component } from '@angular/core';
import { PaymentsTableComponent } from "./payments-table/payments-table.component";
import { DashboardHeaderComponent } from "./dashboard-header/dashboard-header.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PaymentsTableComponent, DashboardHeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
