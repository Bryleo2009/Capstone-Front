import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagoComponent } from './trazaProduct/pago/pago.component';
import { CarritoComponent } from './carrito/carrito.component';
import { environment } from '@env/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@app/_service/rutas/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paqueteria',
  templateUrl: './paqueteria.component.html',
  styleUrls: ['./paqueteria.component.css'],
})
export class PaqueteriaComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private http: HttpClient,
    private almacen:AuthService
  ) {}

  btnNext: string = 'Siguiente';
  @ViewChild(PagoComponent) paymentComponent!: PagoComponent;
  resumen: boolean = true;
  actualizarResumenDesdeHijo(nuevoResumen: boolean) {
    this.resumen = nuevoResumen;
  }

  @ViewChild(CarritoComponent) carritoComponent!: CarritoComponent;
  montoProducto: number = 0;

  IGV: number = 0;
  ammout: number = 0;
  actualizarMontoDesdeHijo(nuevoMonto: number, igv: number, amount: number) {
    const objetoTemporal = {
      montoProducto: nuevoMonto,
      IGV: igv,
      ammout: amount,
    };
    console.log(objetoTemporal.ammout);
    // Almacenar el objeto en el localStorage
    localStorage.setItem('resumenCarrito', JSON.stringify(objetoTemporal));
    this.montoProducto = Number(nuevoMonto.toFixed(2));
    this.IGV = Number((nuevoMonto * 0.18).toFixed(2));
    this.ammout = Number((nuevoMonto + this.IGV).toFixed(2));
  }

  @ViewChild(CarritoComponent) carritoComponentCant!: CarritoComponent;
  cantidad: number = 0;
  actualizarCantidadDesdeHijo(cantidad: number) {
    this.cantidad = cantidad;
    // Almacenar el objeto en el localStorage
    localStorage.setItem('cantCarrito', JSON.stringify(cantidad));
  }

  ngOnInit(): void {
    const rutaActual = this.router.url;
    const objetoAlmacenadoStr = localStorage.getItem('resumenCarrito');
    const cantLocalStorage = localStorage.getItem('cantCarrito');

    this.intervalId = setInterval(() => {
      this.verificarConexion(this.almacen.getToken());
    }, 5000);

    if (cantLocalStorage !== null) {
      this.cantidad = parseInt(cantLocalStorage);
    } else {
      this.cantidad = 0;
    }

    if (objetoAlmacenadoStr !== null) {
      const objetoAlmacenado = JSON.parse(objetoAlmacenadoStr);
      this.actualizarMontoDesdeHijo(
        objetoAlmacenado.montoProducto,
        objetoAlmacenado.IGV,
        objetoAlmacenado.ammout
      );
    } else {
      this.montoProducto = 0;
      this.IGV = 0;
      this.ammout = 0;
    }
  }

  ruteo() {
    const rutaActual = this.router.url;
    switch (rutaActual) {
      case '/pedido':
        this.btnNext = 'Siguiente';
        this.router.navigate(['trazabilidad/entrega'], {
          relativeTo: this.route,
        });
        break;
      case '/pedido/trazabilidad/entrega':
        this.btnNext = 'Atrás';
        this.router.navigate(['/pedido/trazabilidad/payment']);
        break;
      case '/pedido/trazabilidad/payment':
        this.router.navigateByUrl('/pedido/trazabilidad/entrega').then(() => {
          // Recargar vista
          location.reload();
        });
        break;
      default:
        break;
    }
  }

  private intervalId: any;
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  url: string = `${environment.HOST_URL}/check-token`;
  verificarConexion(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(this.url, { headers }).subscribe(
      (data) => {},
      (error) => {
        switch (error.status) {
          case 200:
            this.cerrarModal();
            break;
          case 403:
            this.mostrarModalConexionPerdida();
            break;
          default:
            break;
        }
      }
    );
  }

  mostrarModalConexionPerdida() {
    if (environment.modalTokenAbierto == false) {
      environment.modalTokenAbierto = true;
      this.recarga = false;
      Swal.fire({
        title: 'Ups!',
        text: 'Creo que es hora de volver a iniciar sesion',
        icon: 'info',
        confirmButtonText: 'Confirmar',
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['login']);
        }
      });
    }
  }

  recarga!: boolean;
  cerrarModal() {
    environment.modalTokenAbierto = false;
  }
}
