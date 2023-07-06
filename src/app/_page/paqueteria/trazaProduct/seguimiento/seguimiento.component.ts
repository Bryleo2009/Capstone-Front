import { Component, OnInit } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { ProductoFilter } from '@app/_model/filter/productoFilter';
import { EncryptionService } from '@app/_service/util/encryption.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguimientoPedidoFilter } from '@app/_model/filter/seguimientoPedidoFilter';
import { PedidoService } from '@app/_service/modelos/pedido.service';
import { AuthService } from '@app/_service/rutas/auth.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css'],
})
export class SeguimientoComponent implements OnInit {
  productos!: ProductoFilter[];

  constructor(
    private pedidoService: PedidoService,
    private authService: AuthService
  ) {}
  seguimientos: SeguimientoPedidoFilter[] = [];


  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  ngOnInit(): void {
    this.pedidoService
      .listarPedido(
        this.authService.getUser().idUser,
        this.authService.getToken()
      )
      .subscribe(
        (data) => {
          this.seguimientos = data;
          console.log('🔥 > SeguimientoComponent > ngOnInit > data:', data);
          // Establecer la propiedad 'esUltimo' en cada objeto de seguimiento
          for (var i = 0; i < this.seguimientos.length; i++) {
            for (var j = 0; j < this.seguimientos[i].trazabilidad.length; j++) {
              // Verificar si es el último registro
              if (j === this.seguimientos[i].trazabilidad.length - 1) {
                this.seguimientos[i].trazabilidad[j].esUltimo = true;
              }
            }
          }
        },
        (error) => {}
      );
  }

  formatarFecha(timestamp: number) {
    const fecha = new Date(timestamp);

    // Obtenemos los componentes de la fecha
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
    const año = fecha.getFullYear() % 100; // Tomamos los últimos dos dígitos del año

    // Formateamos los componentes con ceros a la izquierda si es necesario
    const diaFormateado = dia.toString().padStart(2, '0');
    const mesFormateado = mes.toString().padStart(2, '0');
    const añoFormateado = año.toString().padStart(2, '0');

    // Creamos la cadena con el formato deseado
    const fechaFormateada = `${diaFormateado}/${mesFormateado}/${añoFormateado}`;

    return fechaFormateada;
  }
}