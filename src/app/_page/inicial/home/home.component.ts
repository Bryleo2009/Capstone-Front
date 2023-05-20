import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoFilter } from '@app/_model/filter/productoFilter';
import { CategoriasService } from '@app/_service/modelos/categorias.service';
import { EtiquetaService } from '@app/_service/modelos/etiqueta.service';
import { MarcaService } from '@app/_service/modelos/marca.service';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { TallaService } from '@app/_service/modelos/talla.service';
import { EncryptionService } from '@app/_service/util/encryption.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogComponent } from '@app/_page/producto/store/dialog/dialog.component';
import { AuthService } from '@app/_service/rutas/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private categoriaService: CategoriasService,
    private productoService: ProductoService,
    private tallaService: TallaService,
    private marcaService: MarcaService,
    private etiquetaService: EtiquetaService,
    private router: Router,
    private encryp: EncryptionService,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    public dialogService: DialogService,
    private auth: AuthService
  ) {}

  responsiveOptions: any[] = [];
  ref!: DynamicDialogRef;
  ngOnInit(): void {
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
    //listar productos
    this.listarProductosCaballeros();
    this.listarProductosDamas();
  }

  productosCaballeros!: ProductoFilter[];
  listarProductosCaballeros(): void {
    this.productoService
      .listarRandom('CAB', 20,this.auth.getToken())
      .subscribe((data) => {
        this.productosCaballeros = data;
        console.log("🔥 > HomeComponent > .subscribe > this.productosCaballeros:", this.productosCaballeros)
      });
  }

  productosDamas!: ProductoFilter[];
  listarProductosDamas(): void {
    this.productoService
      .listarRandom('DAM', 20,this.auth.getToken())
      .subscribe((data) => {
        this.productosDamas = data;
        console.log("🔥 > HomeComponent > .subscribe > data:", data)
        console.log("🔥 > HomeComponent > .subscribe > this.productosDamas:", this.productosDamas)
      });
  }

  navegar(categoria: string) {
    const encryptedCategoria = this.encryp.encrypt(String(categoria));

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router
        .navigate(['/store'], {
          relativeTo: this.route,
          queryParams: { categoria: encryptedCategoria, estado: '_?' },
          fragment: 'filtrado',
        })
        .then(() => {
          this.viewportScroller.scrollToPosition([0, 0]); // Scroll hacia arriba
        });
    });
  }

  //encriptamiento de ruta de visualizacion
  visualizar(id: number) {
    const encryptedId = this.encryp.encrypt(String(id));

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router
        .navigate(['/details'], {
          relativeTo: this.route,
          queryParams: { id: encryptedId, estado: '_?' },
        })
        .then(() => {
          this.viewportScroller.scrollToPosition([0, 0]); // Scroll hacia arriba
        });
    });
  }

  show(idProduct: number) {
    this.ref = this.dialogService.open(DialogComponent, {
      header: 'Seleccion de producto',
      height: '60%',
      width: '60%',
      contentStyle: { overflow: 'auto' },
      data: {
        id: idProduct,
      },
    });
  }
}
