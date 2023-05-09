import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import * as braintree from 'braintree-web';

import { PaymentService } from '@app/_service/modelos/payment.service';
import { PaymentFilter } from '@app/_model/filter/paymentFilter';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  paymentForm!: FormGroup;
  clientToken!: string;
  amount: number = 1;
  carga: boolean = false;
  pagoRealizado: boolean = false;
  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cardholderName: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });

    this.paymentService.getTokenPayment().subscribe(
      response => {
        this.clientToken = response.token;
        this.initializeBraintree();
      },
      error => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error en procesado de pago :('
        });
      }
    );
  }

  initializeBraintree() {
    braintree.client.create(
      {
        authorization: this.clientToken
      },
      (clientErr: any, clientInstance: any) => {
        if (clientErr) {
          console.error(clientErr);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error en procesado de pago :('
          });
          this.carga = false;
          return;
        }

        braintree.hostedFields.create(
          {
            client: clientInstance,
            styles: {
              input: {
                'font-size': '14px',
                'font-family': 'Arial, sans-serif'
              }
            },
            fields: {
              number: {
                selector: '#card-number',
                placeholder: '1234 5678 9012 3456'
              },
              cardholderName: {
                selector: '#cardholder-name',
                placeholder: 'Nombre del titular'
              },
              expirationDate: {
                selector: '#expiration-date',
                placeholder: 'MM/YY'
              },
              cvv: {
                selector: '#cvv',
                placeholder: '000'
              }
            }
          },
          (hostedFieldsErr: any, hostedFieldsInstance: any) => {
            if (hostedFieldsErr) {
              console.error(hostedFieldsErr);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error en procesado de pago :('
              });
              this.carga = false;
              return;
            }

            const form = document.getElementById('payment-form');
            form?.addEventListener('submit', event => {
              event.preventDefault();

              hostedFieldsInstance.tokenize((tokenizeErr: any, payload: any) => {
                if (tokenizeErr) {
                  console.error(tokenizeErr);
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Campos de tarjeta erroneos :('
                  });
                  this.carga = false;
                  return;
                }

                const filter = new PaymentFilter(payload.nonce, this.amount);
                this.paymentService.checkout(filter).subscribe(
                  data => {
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Pago realizado de manera exitosa',
                      detail: 'El monto ha sido cobrado :)'
                    });
                    this.carga = false;
                    this.pagoRealizado = true;
                    // Eliminar todos los productos del localStorage
                    localStorage.removeItem('carrito');
                    // Agrega lógica adicional según tus necesidades
                  },
                  error => {
                    console.error(error);
                    // Agrega manejo de errores según sea necesario
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: error
                    });
                    this.carga = false;
                  }
                );
              });
            });
          }
        );
      }
    );
  }

  makePayment() {
    this.carga = true;
    if (this.paymentForm.invalid) {
      return;
    }

    const form = document.getElementById('payment-form');
    form?.dispatchEvent(new Event('submit'));
  }
}
