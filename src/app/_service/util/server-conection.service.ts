import { Injectable, Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-modal-conexion-perdida',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Advertencia</h4>
    </div>
    <div class="modal-body">
      <p>
        No se ha podido conectar con el servidor. Por favor, verifica tu
        conexión a internet e inténtalo de nuevo.
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="cerrarModal()">
        Cerrar
      </button>
    </div>
  `,
})
export class ServerConectionService {

  url:string = `${environment.HOST_URL}/swagger-ui.html#/`;

  constructor(private http: HttpClient, private modalService: BsModalService) {
    setInterval(() => {
      this.verificarConexion();
    }, 5000);
  }

  verificarConexion() {
    this.http.get(this.url).subscribe(
      (data) => {
        console.log('Datos recibidos', data);
      },
      (error) => {
        switch (error.status) {
          case 0:
            this.mostrarModalConexionPerdida();
            break;
          case 200:
            this.cerrarModal();
            break;
          default:
            break;
        }
      }
    );
  }

  mostrarModalConexionPerdida() {
    if (environment.modalAbierto == false) {
      environment.modalAbierto = true;
      this.recarga = false;
      this.modalService.show(ServerConectionService);
    }
  }

  recarga!: boolean;
  cerrarModal() {
    environment.modalAbierto = false;
    this.modalService.hide();
  }
}
