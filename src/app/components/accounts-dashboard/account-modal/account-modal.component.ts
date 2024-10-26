import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IAccount } from '../../../interfaces/IAccount';
import { AccountService } from '../../../core/services/account.service';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-account-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogContent,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountModalComponent {
  accountForm!: FormGroup;
  isEdit: boolean = false;
  userImage: string | ArrayBuffer | null = null;
  hide = signal(true);

  @Input() dataSource!: IAccount;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<AccountModalComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dataSource: MatTableDataSource<IAccount>;
      isEdit: boolean;
      account: IAccount;
    }
  ) {}

  ngOnInit() {
    this.createForm();
    if (this.data) {
      this.isEdit = this.data.isEdit;
      if (this.isEdit && this.data.account) {
        this.accountForm.patchValue(this.data.account);
        this.userImage = this.data.account.img;
      }
    }
  }

  createForm() {
    return (this.accountForm = this.fb.group({
      name: ['', Validators.required],
      username: [
        '',
        Validators.required,
        this.uniqueUsernameValidator.bind(this),
      ],
      email: ['', Validators.email, this.uniqueEmailValidator.bind(this)],
      password: ['', Validators.required],
      isAdmin: [false],
    }));
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      const file: File = target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.userImage = e.target?.result as string;
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  uniqueUsernameValidator(control: AbstractControl) {
    if (!control.value) {
      return of(null);
    }

    const isTaken = this.data.dataSource.data.some((account) =>
      this.isEdit
        ? account.username === control.value &&
          account.id !== this.data.account.id
        : account.username === control.value
    );

    return of(isTaken ? { usernameTaken: true } : null);
  }

  uniqueEmailValidator(control: AbstractControl) {
    if (!control.value) {
      return of(null);
    }

    const isTaken = this.data.dataSource.data.some((account) =>
      this.isEdit
        ? account.email === control.value && account.id !== this.data.account.id
        : account.email === control.value
    );

    return of(isTaken ? { emailTaken: true } : null);
  }

  onSubmit() {
    this.accountForm.markAllAsTouched();
    if (!this.accountForm.valid) return;

    const formValue = this.accountForm.value;
    const lastId =
      this.data.dataSource.data.length > 0
        ? Math.max(...this.data.dataSource.data.map((account) => account.id))
        : 0;

    const accountToSave: IAccount = {
      ...formValue,
      id: this.isEdit ? this.data.account.id : lastId + 1,
      img: this.userImage,
    };

    const action = this.isEdit
      ? this.accountService.updateAccount(accountToSave)
      : this.accountService.addAccount(accountToSave);

    action.subscribe({
      next: (savedAccount) => {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && currentUser.id === savedAccount.id) {
          this.authService.updateUser(savedAccount);
        }
        this.dialogRef.close(savedAccount);
      },
    });
  }
}
