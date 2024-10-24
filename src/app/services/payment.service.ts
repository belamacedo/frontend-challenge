import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPayment } from '../interface/IPayment';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private api = 'http://localhost:3030/tasks';

  constructor(private http: HttpClient) {}

  getPayments(): Observable<IPayment[]> {
    return this.http.get<IPayment[]>(this.api);
  }

  addPayment(payment: IPayment): Observable<IPayment> {
    return this.http.post<IPayment>(this.api, payment);
  }

  updatePayment(payment: IPayment): Observable<IPayment> {
    return this.http.put<IPayment>(`${this.api}/${payment.id}`, payment);
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
