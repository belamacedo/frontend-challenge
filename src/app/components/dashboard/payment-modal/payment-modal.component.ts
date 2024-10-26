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
import { IPayment } from '../../../interfaces/IPayment';
import { PaymentsService } from '../../../core/services/payment.service';
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

  ngOnInit() {
    this.createForm();

    if (this.data) {
      this.isEdit = this.data.isEdit;
      if (this.isEdit && this.data.payment) {
        this.paymentForm.patchValue(this.data.payment);
      }
    }
  }

  createForm() {
    return (this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      title: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      isPayed: [false],
    }));
  }

  onSubmit() {
    this.paymentForm.markAllAsTouched();
    if (!this.paymentForm.valid) return;

    const formValue = this.paymentForm.value;
    const lastId =
      this.data.dataSource.data.length > 0
        ? Math.max(...this.data.dataSource.data.map((payment) => payment.id))
        : 0;

    const paymentToSave: IPayment = {
      ...formValue,
      id: this.isEdit ? this.data.payment.id : lastId + 1,
    };

    const action = this.isEdit
      ? this.paymentsService.updatePayment(paymentToSave)
      : this.paymentsService.addPayment(paymentToSave);

    action.subscribe({
      next: (savedPayment) => {
        this.dialogRef.close(savedPayment);
      },
    });
  }
}
