import { Component } from '@angular/core';
import { PaymentsTableComponent } from '../payments-table/payments-table.component';

@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [PaymentsTableComponent],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.scss',
})
export class TableContainerComponent {}
