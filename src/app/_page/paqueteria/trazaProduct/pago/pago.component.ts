import { Component, OnInit } from '@angular/core';
import * as braintree from 'braintree-web';
import { environment } from '@env/environment.development';
import { Observable, catchError, map, throwError } from 'rxjs';
import { PaymentService } from '@app/_service/modelos/payment.service';
import { PaymentFilter } from '@app/_model/filter/paymentFilter';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  constructor(
    private paymentService: PaymentService,
    private messageService: MessageService
  ) { }

  amount!: number;
  clientTokenURL = environment.HOST_URL + '/api/tokenPayment'
  ngOnInit() {
  }


  onPaymentStatus(): void {

  }

  getClientToken(): Observable<any> {
    return this.paymentService.getTokenPayment().pipe(map(
      data => {
        return data.token;
      }
    ),
    catchError(error => {
      return throwError(error);
    }));
  }

  checkcout(nonce: string, amout:number): Observable<any>{
    const filter = new PaymentFilter(nonce,amout);
    return this.paymentService.checkout(filter).pipe(map(
      data => {
        this.messageService.add({
          severity: 'sucess',
          summary: 'Pago realizado de manera exitosa',
          detail: 'El monto ha sido cobrado :)',
        });
        return data;
      }
    ),
    catchError(error => {
      return throwError(error);
    }));
  }
}
