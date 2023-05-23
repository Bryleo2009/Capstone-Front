import { ViewportScroller } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import * as braintree from 'braintree-web';
import * as creditCardType from 'credit-card-type';

import { PaymentService } from '@app/_service/modelos/payment.service';
import { PaymentFilter } from '@app/_model/filter/paymentFilter';

import { ActivatedRoute, Router } from '@angular/router';
import { PaqueteriaComponent } from '../../paqueteria.component';
import { CarritoService } from '@app/_service/modelos/carrito.service';
import { ProductoStorage } from '@app/_model/filter/productoStorage';
import { ProductoStorageService } from '@app/_service/modelos/productoStorage.service';
import { AuthService } from '@app/_service/rutas/auth.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComprobanteFilter } from '@app/_model/filter/comprobanteFilter';
import { ComprobanteService } from '@app/_service/modelos/comprobante.service';
import { ClienteService } from '@app/_service/modelos/cliente.service';
import { Usuario } from '@app/_model/usuario';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent implements OnInit {
  comprobante : ComprobanteFilter = new ComprobanteFilter();
  visible: boolean = true;
  paymentForm!: FormGroup;
  clientToken!: string;
  amount: number = 0;
  carga: boolean = false;
  pagoRealizado: boolean = false;
  isFormLoaded: boolean = false;
  constructor(
    private paymentService: PaymentService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private pedidoComponent: PaqueteriaComponent,
    private carritoService: CarritoService,
    private carritoFilter: ProductoStorageService,
    private viewportScroller: ViewportScroller,
    public dialogService: DialogService,
    private auth: AuthService,
    private comprobanteService : ComprobanteService,
    private clienteService : ClienteService
  ) {}

  ref!: DynamicDialogRef;
  carritoLocalStorage: ProductoStorage[] = [];
  showDialog() {
    this.visible = true;
  }
  ngOnInit() {
    const objetoAlmacenadoStr = localStorage.getItem('resumenCarrito');
    if (objetoAlmacenadoStr !== null) {
      const objetoAlmacenado = JSON.parse(objetoAlmacenadoStr);
      this.amount = objetoAlmacenado.ammout;
    }

    this.paymentForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      cardholderName: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });

    this.paymentService.getTokenPayment().subscribe(
      (response) => {
        this.clientToken = response.token;
        this.initializeBraintree();
      },
      (error) => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error en procesado de pago :(',
        });
      }
    );
  }

  tarjetaActual: string = '';
  initializeBraintree() {
    braintree.client.create(
      {
        authorization: this.clientToken,
      },
      (clientErr: any, clientInstance: any) => {
        if (clientErr) {
          console.error(clientErr);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error en procesado de pago :(',
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
                'font-family': 'Arial, sans-serif',
              },
            },
            fields: {
              number: {
                selector: '#card-number',
                placeholder: '1234 5678 9012 3456',
              },
              cardholderName: {
                selector: '#cardholder-name',
                placeholder: 'Nombre del titular',
              },
              expirationDate: {
                selector: '#expiration-date',
                placeholder: 'MM/YY',
              },
              cvv: {
                selector: '#cvv',
                placeholder: '000',
              },
            },
          },
          (hostedFieldsErr: any, hostedFieldsInstance: any) => {
            if (hostedFieldsErr) {
              console.error(hostedFieldsErr);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error en procesado de pago :(',
              });
              this.carga = false;
              return;
            }
            hostedFieldsInstance.on('cardTypeChange', (event: any) => {
              if (event.cards && event.cards.length > 0) {
                const cardType = event.cards[0].type;
                this.tarjetaActual = cardType;
                console.log("🔥 > PagoComponent > hostedFieldsInstance.on > cardType:", cardType);
              } else {
                this.tarjetaActual = ''; // Valor por defecto si no se detecta ningún tipo de tarjeta
              }
            });
            

            const checkFormLoaded = setInterval(() => {
              const cardNumberInput = document.querySelector('#card-number');
              const cardholderNameInput =
                document.querySelector('#cardholder-name');
              const expirationDateInput =
                document.querySelector('#expiration-date');
              const cvvInput = document.querySelector('#cvv');

              if (
                cardNumberInput &&
                cardholderNameInput &&
                expirationDateInput &&
                cvvInput
              ) {
                console.log('El formulario de pago ha cargado completamente');
                this.isFormLoaded = true;
                clearInterval(checkFormLoaded);
              }
            }, 100);

            const form = document.getElementById('payment-form');

            form?.addEventListener('submit', (event) => {
              event.preventDefault();

              hostedFieldsInstance.tokenize(
                (tokenizeErr: any, payload: any) => {
                  if (tokenizeErr) {
                    console.error(tokenizeErr);
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: 'Campos de tarjeta erroneos :(',
                    });
                    this.carga = false;
                    return;
                  }

                  const filter = new PaymentFilter(payload.nonce, this.amount);
                  this.paymentService.checkout(filter).subscribe(
                    (data) => {
                      this.messageService.add({
                        severity: 'success',
                        summary: 'Pago realizado de manera exitosa',
                        detail: 'El monto ha sido cobrado :)',
                      });
                      this.carga = false;
                      this.pagoRealizado = true;
                      this.actualizarResumenEnPadre();
                      console.log("🔥 > PagoComponent > form?.addEventListener > this.carritoService.obtenerProductosCarrito():", this.carritoService.obtenerProductosCarrito())
                      this.carritoFilter.carritoStock(this.carritoService.obtenerProductosCarrito(),this.auth.getToken()).subscribe(
                        (data) => {
                          console.log("stok desminuido");
                        },(error) => {
                          console.log(error);
                        }
                      );
                      this.clienteService.devolverCliente(this.auth.getUser(), this.auth.getToken()).subscribe(
                        (un_cliente)=> {
                          
                          const objetoAlmacenadoStr = localStorage.getItem('resumenCarrito');
                          if (objetoAlmacenadoStr !== null) {
                            const objetoAlmacenado = JSON.parse(objetoAlmacenadoStr);
                            this.comprobante.montoProducto = objetoAlmacenado.montoProducto;
                            this.comprobante.ammount = objetoAlmacenado.ammount;
                            this.comprobante.igv = objetoAlmacenado.comprobante;
                          }

                          this.comprobante.cliente = un_cliente;
                          this.comprobante.productos = this.carritoService.obtenerProductosCarrito();
                          this.comprobante.direccionComp = un_cliente.direccion;
                         /*this.comprobante.idTc
                          this.comprobante.ubigeoComp = un_cliente.ubigueo;*/

                          this.comprobanteService.sendDatoComprobantes(this.comprobante, this.auth.getToken()).subscribe(
                            (response)=> {
                              console.log("Datos enviados correctamente al backend", response);
                            },
                            (error)=>{
                              console.error("Error al enviar datos al backend", error);
                            }
                          );
                        },
                        (error)=>{
                          console.error(error);
                        }
                      );
                       // Eliminar todos los productos del localStorage
                      localStorage.removeItem('carrito');
                      localStorage.removeItem('cantCarrito');
                      localStorage.removeItem('resumenCarrito');
                      this.carritoService.limpiarCarrito();
                      // Agrega lógica adicional según tus necesidades
                    },
                    (error) => {
                      console.error(error);
                      // Agrega manejo de errores según sea necesario
                      this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error,
                      });
                      this.carga = false;
                    }
                  );
                }
              );
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

  actualizarResumenEnPadre() {
    const nuevoResumen = false;
    console.log("acrtualizando resumen")
    this.pedidoComponent.actualizarResumenDesdeHijo(nuevoResumen);
  }

  comprado() {
    const nuevoResumen = false;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router
        .navigate(['/'], {
          relativeTo: this.route
        })
        .then(() => {
          this.viewportScroller.scrollToPosition([0, 0]); // Scroll hacia arriba
        });
    });
  }
}
