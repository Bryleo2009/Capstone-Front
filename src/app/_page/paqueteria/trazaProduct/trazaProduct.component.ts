import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@app/_service/rutas/auth.service';
import { environment } from '@env/environment.development';
import Swal from 'sweetalert2';
import { DataService } from '@app/_service/modelos/data.service';

@Component({
  selector: 'app-trazaProduct',
  templateUrl: './trazaProduct.component.html',
  styleUrls: ['./trazaProduct.component.css'],
})
export class TrazaProductComponent implements OnInit {
  constructor(public messageService: MessageService,private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private almacen:AuthService,
    private dataService: DataService) {}

  items!: MenuItem[];
  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.verificarConexion(this.almacen.getToken());
    }, 5000);
    this.items = [
      {
        label: 'Productos',
        routerLink: 'pedido',
      },
      {
        label: 'Datos de entrega',
        routerLink: 'entrega',
      },
      {
        label: 'Pago',
        routerLink: 'payment',
      },
      {
        label: 'Confirmacion',
        routerLink: 'ok',
      },
    ];
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
          default:
            this.mostrarModalConexionPerdida();
            break;
        }
      }
    );
  }

  mostrarModalConexionPerdida() {
    if (environment.modalTokenAbierto == false) {
      environment.modalTokenAbierto = true;
      this.dataService.updateVariable(false);
      this.recarga = false;
      Swal.fire({
        title: 'Ups!',
        text: 'Creo que es hora de volver a iniciar sesion',
        icon: 'info',
        confirmButtonText: 'Confirmar',
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.almacen.removeAll();
          
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
