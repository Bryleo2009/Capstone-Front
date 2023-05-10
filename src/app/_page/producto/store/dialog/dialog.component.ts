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
import { Enum, EnumInter } from '@app/_model/enum';
import { ProductoFilter } from '@app/_model/filter/productoFilter';
import { ColorService } from '@app/_service/modelos/color.service';
import { TallaService } from '@app/_service/modelos/talla.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  ingredient!: string; 
  
  constructor(
    private router: Router,
    private encryp: EncryptionService,
    private route: ActivatedRoute,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private productoService: ProductoService,
    private messageService: MessageService,
    private carritoService: CarritoService,
    private general: AppComponent,
    private colorSerive: ColorService,
    private tallaService: TallaService
  ) {}
  abreviaturastipoproducto: any[] = [];
  abreviaturasEtiqueta: any[] = [];
  abreviaturastalla: any[] = [];
  abreviaturasmarca: any[] = [];
  precioMin: number = 10;
  precioMax: number = 1000;
  pageSize: number = 12;
  first: number = 0;
  productos!: ProductoFilter[];
  totalRecords: number = 0;
  colores!: EnumInter[];
  selectedCategoriesColors: any[] = [];
  seleccion!: string;
  cant = 1;
  talla!: EnumInter[];
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
        this.tallaService.listarPorIdTalla(this.producto.idProduct, 'token').subscribe((data) => {
          this.talla = data;
        });

      this.colorSerive
      .listarPorIdColor(this.producto.idProduct, 'token')
      .subscribe((data) => {
        this.colores = data;
      });
    });
  }

  cerrarModal() {
    this.ref.close(this.ref);
  }

  agregarAlCarrito(idProducto: number, cantidadProducto: number){
    this.messageService.add({ severity: 'success', summary: 'Regristro exitoso!', detail: 'El producto ha sido agregado al carrito' });
    // Lógica para agregar los productos al carrito
    this.carritoService.agregarAlCarrito(idProducto, cantidadProducto);
  }

  listarProductos(categoria: string): void {
    this.productoService
      .listar(
        categoria,
        this.abreviaturastipoproducto,
        this.abreviaturasEtiqueta,
        this.abreviaturastalla,
        this.abreviaturasmarca,
        this.selectedCategoriesColors,
        this.precioMin,
        this.precioMax,
        this.pageSize,
        this.first / this.pageSize,
        'token'
      )
      .subscribe(
        (response) => {
          this.productos = response.content;
          console.log(
            '🔥 > StoreComponent > listarProductos > this.productos:',
            this.productos
          );
          this.totalRecords = response.totalElements;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  filtrar(categoria: string) {
    console.log('🔥 > StoreComponent > filtrar > categoria:', categoria);
    this.listarProductos(categoria);
  }
}
