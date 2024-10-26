import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IPayment } from '../../../interfaces/IPayment';
import { CommonModule } from '@angular/common';
import { PaymentsService } from '../../../core/services/payment.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { TableContainerComponent } from './table-container/table-container.component';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-payments-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCheckbox,
    CommonModule,
    FormsModule,
    MatIconModule,
    TableContainerComponent,
    MatSortModule,
  ],
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss'],
})
export class PaymentsTableComponent implements OnInit {
  currentPage = 0;

  columns = [
    { key: 'name', label: 'Nome' },
    { key: 'username', label: 'Usuário' },
    { key: 'title', label: 'Título' },
    { key: 'date', label: 'Data' },
    { key: 'isPayed', label: 'Pago' },
    { key: 'value', label: 'Valor' },
    { key: 'actions', label: 'Ações' },
  ];

  displayedColumns = this.columns.map((column) => column.key);
  dataSource = new MatTableDataSource<IPayment>([]);

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private paymentsService: PaymentsService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPayments() {
    this.paymentsService.getPayments().subscribe((payments: IPayment[]) => {
      this.dataSource.data = payments;
    });
  }

  deletePayment(paymentId: number): void {
    this.paymentsService.deletePayment(paymentId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (payment) => payment.id !== paymentId
      );
    });
  }

  isEven(row: IPayment): boolean {
    const index = this.dataSource.data.indexOf(row);
    return index % 2 === 0;
  }

  openPaymentModal(payment: IPayment): void {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      data: {
        dataSource: this.dataSource,
        isEdit: true,
        payment: payment,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data.push(result);
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  announceSortChange(sortState: Sort) {
    return sortState.direction
      ? this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
      : this._liveAnnouncer.announce('Sorting cleared');
  }
}
