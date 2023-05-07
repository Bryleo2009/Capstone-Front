import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '@app/_model/categoria';
import { Colors, Enum } from '@app/_model/enum';
import { ProductoFilter } from '@app/_model/filter/productoFilter';
import { Producto } from '@app/_model/producto';
import { CategoriasService } from '@app/_service/modelos/categorias.service';
import { EtiquetaService } from '@app/_service/modelos/etiqueta.service';
import { MarcaService } from '@app/_service/modelos/marca.service';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { TallaService } from '@app/_service/modelos/talla.service';
import { TipoProductoService } from '@app/_service/modelos/tipo-producto.service';
import { EncryptionService } from '@app/_service/util/encryption.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogComponent } from '../store/dialog/dialog.component';

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
      .listar('CAB', [], [], [], [], [], 0, 999, 20, 0, 'token')
      .subscribe((data) => {
        this.productosCaballeros = data.content;
      });
  }

  productosDamas!: ProductoFilter[];
  listarProductosDamas(): void {
    this.productoService
      .listar('DAM', [], [], [], [], [], 0, 999, 20, 0, 'token')
      .subscribe((data) => {
        this.productosDamas = data.content;
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
      height: '40%',
      width: '60%',
      contentStyle: { overflow: 'auto' },
      data: {
        id: idProduct,
      },
    });
  }
}
