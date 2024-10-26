import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ButtonComponent } from '../../shared/button/button.component';
import { SearchComponent } from '../../shared/search/search.component';
import { IAccount } from '../../../interfaces/IAccount';
import { AccountService } from '../../../core/services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AccountModalComponent } from '../account-modal/account-modal.component';

@Component({
  selector: 'app-accounts-table',
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
  templateUrl: './accounts-table.component.html',
  styleUrl: './accounts-table.component.scss',
})
export class AccountsTableComponent {
  currentPage = 0;

  columns = [
    { key: 'name', label: 'Nome' },
    { key: 'username', label: 'Usuário' },
    { key: 'email', label: 'Email' },
    { key: 'password', label: 'Senha' },
    { key: 'actions', label: 'Ações' },
  ];

  displayedColumns = this.columns.map((column) => column.key);
  dataSource = new MatTableDataSource<IAccount>([]);

  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private accountsService: AccountService,
    private dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadAccounts() {
    this.accountsService.getAccounts().subscribe((accounts: IAccount[]) => {
      this.dataSource.data = accounts;
    });
  }

  deleteAccount(accountId: number): void {
    this.accountsService.deleteAccount(accountId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(
        (account) => account.id !== accountId
      );
    });
  }

  isEven(row: IAccount): boolean {
    const index = this.dataSource.data.indexOf(row);
    return index % 2 === 0;
  }

  openAccountModal(
    account: IAccount | null = null,
    isEdit: boolean = true
  ): void {
    const dialogRef = this.dialog.open(AccountModalComponent, {
      data: {
        dataSource: this.dataSource,
        isEdit: isEdit,
        account: account,
      },
      panelClass: 'custom-dialog-container',
      height: '500px',
      width: '400px',
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
