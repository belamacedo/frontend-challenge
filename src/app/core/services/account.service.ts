import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAccount } from '../../interfaces/IAccount';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private api = 'http://localhost:3030/accounts';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<IAccount[]> {
    return this.http.get<IAccount[]>(this.api);
  }

  addAccount(account: IAccount): Observable<IAccount> {
    return this.http.post<IAccount>(this.api, account);
  }

  updateAccount(account: IAccount): Observable<IAccount> {
    return this.http.put<IAccount>(`${this.api}/${account.id}`, account);
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
