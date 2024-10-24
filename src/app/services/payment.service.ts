import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPayment } from '../interface/IPayment';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private apiUrl = 'http://localhost:3030/tasks';

  constructor(private http: HttpClient) {}

  getPayments(): Observable<IPayment[]> {
    return this.http.get<IPayment[]>(this.apiUrl);
  }

  addPayment(payment: IPayment): Observable<IPayment> {
    return this.http.post<IPayment>(this.apiUrl, payment);
  }

  updatePayment(payment: IPayment): Observable<IPayment> {
    return this.http.put<IPayment>(`${this.apiUrl}/${payment.id}`, payment);
  }

  deletePayment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
