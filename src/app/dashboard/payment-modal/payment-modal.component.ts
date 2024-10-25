import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogContainer,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IPayment } from '../../interface/IPayment';
import { PaymentsService } from '../../services/payment.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentModalComponent {
  paymentForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private paymentsService: PaymentsService,
    private dialogRef: MatDialogRef<PaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPayment
  ) {
    this.paymentForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      title: ['', Validators.required],
      value: ['', Validators.required],
      date: ['', Validators.required],
      isPayed: [false],
    });

    console.log(this.paymentForm);
  }

  ngOnInit(): void {
    if (this.data) {
      this.paymentForm.patchValue(this.data);
    }

    this.paymentForm.valueChanges.subscribe((value) => {
      console.log('Valores do formulário:', value);
      console.log(this.paymentForm.valid);
    });
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    const paymentData = {
      id: this.data?.id || Math.floor(Math.random() * 1000),
      ...this.paymentForm.value,
    };
    console.log(paymentData);
    this.paymentsService.addPayment(paymentData);
    this.dialogRef.close(paymentData);
  }
}
