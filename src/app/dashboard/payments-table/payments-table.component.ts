import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IPayment } from '../../interface/IPayment';
import { CommonModule } from '@angular/common';
import { PaymentsService } from '../../services/payment.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payments-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCheckbox,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.scss'],
})
export class PaymentsTableComponent implements OnInit {
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

  constructor(private paymentsService: PaymentsService) {}

  ngOnInit(): void {
    this.paymentsService.getPayments().subscribe(
      (payments: IPayment[]) => {
        this.dataSource.data = payments;
      },
      (error) => {
        console.error('Erro ao carregar os pagamentos', error);
      },
    );
  }

  deletePayment(paymentId: number): void {
    console.log(paymentId);
    this.paymentsService.deletePayment(paymentId).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(
          (payment) => payment.id !== paymentId,
        );
      },
      (error) => {
        console.error('Erro ao excluir o pagamento:', error);
      },
    );
  }
}
