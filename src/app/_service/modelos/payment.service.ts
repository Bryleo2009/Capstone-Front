import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentFilter } from '@app/_model/filter/paymentFilter';
import { environment } from '@env/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url:string = `${environment.HOST_URL}/api`;
  constructor(private http: HttpClient) { }

  getTokenPayment(): Observable<any>{
    return this.http.get<any>(`${this.url}/tokenPayment`);
  }

  checkout(filter: PaymentFilter): Observable<any>{
    return this.http.post<any>(`${this.url}/checkout`,filter);
  }

}
