import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoStorage } from '@app/_model/filter/productoStorage';
import { Producto } from '@app/_model/producto';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { EncryptionService } from '@app/_service/util/encryption.service';
import { MessageService } from 'primeng/api';
import { environment } from '@env/environment.development';
import { CarritoService } from '@app/_service/modelos/carrito.service';

import {
  DialogService,
  DynamicDialogRef,
  DynamicDialogConfig,
} from 'primeng/dynamicdialog';
import { AppComponent } from '@app/app.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {

  constructor(
    private router: Router,
    private encryp: EncryptionService,
    private route: ActivatedRoute,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private productoService: ProductoService,
    private messageService: MessageService,
    private carritoService: CarritoService,
    private general: AppComponent
  ) {}

  cant = 1;
  producto: Producto = new Producto();
  ngOnInit(): void {
    
    this.productoService
      .listarPorId(this.config.data.id, 'token')
      .subscribe((data) => {
        this.producto = data;
        console.log(
          '🔥 > DialogComponent > .subscribe > this.producto :',
          this.producto
        );
      });
  }

  cerrarModal() {
    this.ref.close(this.ref);
  }

  agregarAlCarrito(idProducto: number, cantidadProducto: number){
    // Lógica para agregar los productos al carrito
    this.carritoService.agregarAlCarrito(idProducto, cantidadProducto);
  }
}
