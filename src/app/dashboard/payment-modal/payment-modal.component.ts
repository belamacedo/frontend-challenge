import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IPayment } from '../../interface/IPayment';
import { PaymentsService } from '../../services/payment.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatDialogContent,
  ],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentModalComponent {
  paymentForm!: FormGroup;
  isEdit: boolean = false;
  @Input() dataSource!: IPayment;

  constructor(
    private fb: FormBuilder,
    private paymentsService: PaymentsService,
    private dialogRef: MatDialogRef<PaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dataSource: MatTableDataSource<IPayment>;
      isEdit: boolean;
      payment: IPayment;
    }
  ) {}

  ngOnInit(): void {
    this.createForm();

    if (this.data) {
      this.isEdit = this.data.isEdit;
      if (this.isEdit && this.data.payment) {
        this.paymentForm.patchValue(this.data.payment);
      }
    }
  }

  createForm(): FormGroup {
    return (this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      title: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      isPayed: [false],
    }));
  }

  onSubmit(): void {
    this.paymentForm.markAllAsTouched();
    if (this.paymentForm.valid) {
      const formValue = this.paymentForm.value;

      if (this.isEdit && this.data.payment) {
        const updatedPayment: IPayment = {
          ...this.data.payment,
          ...formValue,
        };
        this.paymentsService.updatePayment(updatedPayment).subscribe({
          next: (savedPayment) => {
            const index = this.data.dataSource.data.findIndex(
              (p) => p.id === savedPayment.id
            );
            this.data.dataSource.data[index] = savedPayment;
            this.data.dataSource._updateChangeSubscription();
            this.dialogRef.close(savedPayment);
          },
        });
      } else {
        const lastId =
          this.data.dataSource.data.length > 0
            ? Math.max(
                ...this.data.dataSource.data.map((payment) => payment.id)
              )
            : 0;

        const newPayment: IPayment = {
          ...formValue,
          id: lastId + 1,
        };

        this.paymentsService.addPayment(newPayment).subscribe({
          next: (savedPayment) => {
            this.data.dataSource.data.push(savedPayment);
            this.data.dataSource._updateChangeSubscription();
            this.dialogRef.close(savedPayment);
          },
        });
      }
    }
  }
}
