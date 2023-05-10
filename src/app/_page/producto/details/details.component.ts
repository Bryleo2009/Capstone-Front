import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoFilter } from '@app/_model/filter/productoFilter';
import { Producto } from '@app/_model/producto';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { TallaService } from '@app/_service/modelos/talla.service';
import { EncryptionService } from '@app/_service/util/encryption.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogComponent } from '../store/dialog/dialog.component';
import { AppComponent } from '@app/app.component';
import { CarritoService } from '@app/_service/modelos/carrito.service';
import { ColorService } from '@app/_service/modelos/color.service';
import { Enum, EnumInter } from '@app/_model/enum';

interface Car {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  priced?: number;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class Details01Component {
  constructor(
    private route: ActivatedRoute,
    private encryp: EncryptionService,
    private router: Router,
    private producSerive: ProductoService,
    private tallaSerive: TallaService,
    private colorSerive: ColorService,
    private viewportScroller: ViewportScroller,
    public dialogService: DialogService,
    private general: AppComponent,
    private carritoService: CarritoService,
  ) {}
  responsiveOptions: any[] = [];
  id!: string;
  estado: string = '';
  producto: Producto = new Producto();
  estrellas = 3;
  cant = 1;
  ref!: DynamicDialogRef;
  tallas:EnumInter[] = [];
  colores:EnumInter[] = [];
  ngOnInit() {
    //si estoy visualizando
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.estado = params['estado'];
    });

    if (this.id !== null && this.id !== undefined && this.id !== '') {
      this.producSerive
        .listarPorId(this.encryp.decrypt(this.id), 'token')
        .subscribe((unproducto: Producto) => {
          this.producto = unproducto;
          console.log(
            '🔥 > Details01Component > .subscribe > producto:',
            this.producto
          );
          //listar tallas
          this.tallaSerive
            .listarPorIdTalla(unproducto.idProduct, 'token')
            .subscribe((data) => {
              this.tallas= data;
              console.log("🔥 > Details01Component > .subscribe > data:", data)
            });
            //listar colores
          this.colorSerive
          .listarPorIdColor(unproducto.idProduct, 'token')
          .subscribe((data) => {
            this.colores = data;
            console.log("🔥 > Details01Component > .subscribe > data:", data)
          });
        });
    }

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.listarProductos();
  }

  cars: Car[] = [];

  productos!: ProductoFilter[];
  listarProductos(): void {
    this.producSerive
      .listar('', [], [], [], [], [], 0, 999, 20, 0, 'token')
      .subscribe((data) => {
        this.productos = data.content;
      });
  }

  //encriptamiento de ruta de visualizacion
  visualizar(id: number) {
    const encryptedId = this.encryp.encrypt(String(id));

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/details'], {
        relativeTo: this.route,
        queryParams: { id: encryptedId, estado: '_?' },
      }).then(() => {
        this.viewportScroller.scrollToPosition([0, 0]); // Scroll hacia arriba
      });
    });
  }

  show(idProduct: number) {
    this.ref = this.dialogService.open(DialogComponent, {
      header: 'Seleccion de producto',
      height: '40%',
      width: '60%',
      contentStyle: { overflow: 'auto' },
      data: {
        id: idProduct,
      },
    });
  }

  // agregarAlCarrito(idProducto: number, cantidadProducto: number){
  //   // Lógica para agregar los productos al carrito
  //   this.carritoService.agregarAlCarrito(idProducto, cantidadProducto);
  // }
  
}
