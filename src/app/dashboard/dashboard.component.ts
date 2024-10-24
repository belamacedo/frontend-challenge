import { Component } from '@angular/core';
import { PaymentsTableComponent } from "./payments-table/payments-table.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PaymentsTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
