import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IPayment } from '../../../interfaces/IPayment';
import { CommonModule } from '@angular/common';
import { PaymentsService } from '../../../core/services/payment.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SearchComponent } from '../../shared/search/search.component';
import { ButtonComponent } from '../../shared/button/button.component';

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
    MatSortModule,
    SearchComponent,
    ButtonComponent,
  ],
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss'],
})
export class PaymentsTableComponent {
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

  ngOnInit() {
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

  deletePayment(paymentId: number) {
    this.paymentsService.deletePayment(paymentId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (payment) => payment.id !== paymentId
      );
    });
  }

  getRowClass(index: number) {
    return index % 2 === 0 ? 'row-even' : 'row-odd';
  }

  openPaymentModal(
    payment: IPayment | null = null,
    isEdit: boolean = true
  ): void {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      data: {
        dataSource: this.dataSource,
        isEdit: isEdit,
        payment: payment,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPayments();
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
