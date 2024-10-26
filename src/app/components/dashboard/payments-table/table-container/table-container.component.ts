import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { IPayment } from '../../../../interfaces/IPayment';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from '../../payment-modal/payment-modal.component';

@Component({
  selector: 'app-table-container',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './table-container.component.html',
  styleUrl: './table-container.component.scss',
})
export class TableContainerComponent {
  @Input() dataSource: MatTableDataSource<IPayment> =
    new MatTableDataSource<IPayment>();

  constructor(private dialog: MatDialog) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openPaymentModal(): void {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      data: { dataSource: this.dataSource, isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource._updateChangeSubscription();
      }
    });
  }
}
