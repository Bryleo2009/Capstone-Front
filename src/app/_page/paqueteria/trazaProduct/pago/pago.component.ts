import { ViewportScroller } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import * as braintree from 'braintree-web';
import * as creditCardType from 'credit-card-type';

import { PaymentService } from '@app/_service/modelos/payment.service';
import { PaymentFilter } from '@app/_model/filter/paymentFilter';

import { ActivatedRoute, Router } from '@angular/router';
import { PaqueteriaComponent } from '../../paqueteria.component';
import { CarritoService } from '@app/_service/modelos/carrito.service';
import { ProductoStorage } from '@app/_model/filter/productoStorage';
import { AuthService } from '@app/_service/rutas/auth.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ComprobanteFilter } from '@app/_model/filter/comprobanteFilter';
import { ComprobanteService } from '@app/_service/modelos/comprobante.service';
import { ClienteService } from '@app/_service/modelos/cliente.service';
import { Usuario } from '@app/_model/usuario';
import { DataService } from '@app/_service/modelos/data.service';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { PaqueteProductoService } from '@app/_service/modelos/paquete-producto.service';
import { PaqueteFilter } from '@app/_model/filter/paqueteFilter';
import { PedidoService } from '@app/_service/modelos/pedido.service';
import { Pedido } from '@app/_model/pedido';
import { PedidoFilter } from '@app/_model/filter/pedidoFilter';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent implements OnInit {
  comprobante: ComprobanteFilter = new ComprobanteFilter();
  pedido: PedidoFilter = new PedidoFilter();
  paquete: PaqueteFilter = new PaqueteFilter();
  visible: boolean = false;
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
    private productoService: ProductoService,
    private viewportScroller: ViewportScroller,
    public dialogService: DialogService,
    private auth: AuthService,
    private comprobanteService: ComprobanteService,
    private clienteService: ClienteService,
    private dataService: DataService,
    private paqueteriaService: PaqueteProductoService,
    private pedidoService: PedidoService
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
      ruc: '',
      razonSocial: '',
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
  unPaquete: PaqueteFilter = new PaqueteFilter();
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
                console.log(
                  '🔥 > PagoComponent > hostedFieldsInstance.on > cardType:',
                  cardType
                );
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
                      this.productoService
                        .carritoStock(
                          this.carritoService.obtenerProductosCarrito(),
                          this.auth.getToken()
                        )
                        .subscribe(
                          (data) => {
                            console.log('stok desminuido');
                          },
                          (error) => {
                            console.log(error);
                          }
                        );

                      //agregar a comprobante, detalle y trazabililidad
                      //capturo valores del resumen carrito
                      const objetoAlmacenadoStr =
                        localStorage.getItem('resumenCarrito');
                      if (objetoAlmacenadoStr !== null) {
                        const objetoAlmacenado =
                          JSON.parse(objetoAlmacenadoStr);
                        this.comprobante.montoProducto =
                          objetoAlmacenado.montoProducto;
                        this.comprobante.ammount = objetoAlmacenado.ammout;
                        this.comprobante.igv = objetoAlmacenado.IGV;
                      }
                      this.comprobante.cliente = this.auth.getCliente();
                      this.comprobante.productoStorageList =
                        this.carritoService.obtenerProductosCarrito();
                      this.comprobante.ubigeoComp =
                        this.dataService.obtener_ubigeo();
                      this.comprobante.razonSocial =
                        this.paymentForm.value['razonSocial'];
                      this.comprobante.ruc = this.paymentForm.value['ruc'];
                      if (
                        this.comprobante.razonSocial !== '' &&
                        this.comprobante.ruc !== ''
                      ) {
                        this.comprobante.idTc = true;
                      }
                      this.comprobante.apellidoRecojo =
                        this.dataService.obtener_apellidoRecojo();
                      this.comprobante.nombreRecojo =
                        this.dataService.obtener_nombreRecojo();
                      this.comprobante.celularRecojo =
                        this.dataService.obtener_celularRecojo();
                      this.comprobante.correoRecojo =
                        this.dataService.obtener_correoRecojo();
                      this.comprobante.direccionComp =
                        this.dataService.obtener_direccionRecojo();
                      console.log(
                        '🔥 > PagoComponent > form?.addEventListener > comprobante:',
                        this.comprobante
                      );
                      this.comprobanteService
                        .registrar(this.comprobante, this.auth.getToken())
                        .subscribe(
                          (response: any) => {
                            if (response instanceof HttpErrorResponse) {
                              console.error(response.message);
                              console.log(response.error.text); // Aquí tienes la cadena de texto de la respuesta
                            } else {
                              console.log('response', response); // Aquí tienes la cadena de texto de la respuesta
                            }
                          },
                          (error) => {
                            //agregar a pedido, tazabilidad
                            this.paquete.paqueteProductos =
                              this.carritoService.obtenerProductosCarrito();
                            this.paquete.cliente = this.auth.getCliente();
                            this.pedido.idProduct = this.paquete;
                            this.pedido.apellidoRecojo =
                              this.dataService.obtener_apellidoRecojo();
                            this.pedido.nombreRecojo =
                              this.dataService.obtener_nombreRecojo();
                            this.pedido.celularRecojo =
                              this.dataService.obtener_celularRecojo();
                            this.pedido.correoRecojo =
                              this.dataService.obtener_correoRecojo();
                            this.pedido.direccionRecojo =
                              this.dataService.obtener_direccionRecojo();
                            console.log(
                              '🔥 > PagoComponent > form?.addEventListener > this.pedido:',
                              this.pedido
                            );
                            this.pedidoService
                              .registrar(this.pedido, error.error.text, this.auth.getToken())
                              .subscribe(
                                () => {
                                  //lo que pasa con la respuesta de un pedido guardado
                                },
                                (error) => {
                                  console.error(error);
                                }
                              );
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
                        detail: error.error.message,
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
    this.pedidoComponent.actualizarResumenDesdeHijo(nuevoResumen);
  }

  comprado() {
    const nuevoResumen = false;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router
        .navigate(['/'], {
          relativeTo: this.route,
        })
        .then(() => {
          this.viewportScroller.scrollToPosition([0, 0]); // Scroll hacia arriba
        });
    });
  }
}
