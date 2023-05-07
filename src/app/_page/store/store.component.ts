import { Component, OnInit, ViewChild } from '@angular/core';
import { Colors, Enum } from '@app/_model/enum';
import { ProductoFilter } from '@app/_model/filter/productoFilter';
import { CategoriasService } from '@app/_service/modelos/categorias.service';
import { EtiquetaService } from '@app/_service/modelos/etiqueta.service';
import { MarcaService } from '@app/_service/modelos/marca.service';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { TallaService } from '@app/_service/modelos/talla.service';
import { ColorService } from '../../_service/modelos/color.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from '@app/_service/util/encryption.service';
import { TipoProductoService } from '@app/_service/modelos/tipo-producto.service';
import { TabMenu } from 'primeng/tabmenu';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogComponent } from './dialog/dialog.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  constructor(
    private categoriaService: CategoriasService,
    private productoService: ProductoService,
    private tallaService: TallaService,
    private marcaService: MarcaService,
    private tipoProductoService: TipoProductoService,
    private etiquetaService: EtiquetaService,
    private colorService: ColorService,
    private router: Router,
    private encryp: EncryptionService,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private viewportScroller: ViewportScroller
  ) {
    this.seleccion = '';
    this.categoriaActual = 'Todas las categorias';
  }

  ref!: DynamicDialogRef;
  rangeValues: number[] = [20, 80];
  selectedCategories: any[] = [];
  selectedCategoriesColors: any[] = [];
  categoriesTalla!: any[];
  categoriaActual!: string;
  precioMin: number = 10;
  precioMax: number = 1000;
  categorias!: Enum[];
  colores!: Colors[];
  talla!: Enum[];
  marca!: Enum[];
  tipoproducto!: Enum[];
  etiquetas!: Enum[];
  productos!: ProductoFilter[];
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  rows: number = 12;
  selectedEtiqueta!: Enum;
  selectedtalla!: Enum;
  selectedmarca!: Enum;
  selectedtipoproducto!: Enum;
  items!: MenuItem[];
  seleccion!: string;
  activeItem!: MenuItem;
  ngOnInit(): void {
    this.updateValuesEtiquetas(); // llama a la función para asegurarte de que los valores iniciales se muestren en el chip
    this.updateValuestalla();
    this.updateValuesmarca();
    //listar tallas
    this.tallaService.listar('token').subscribe((data) => {
      this.talla = data.filter((color) => color.vistaItem !== 'Talla unica');
    });

    //listar tipod eporducto
    this.tipoProductoService.listar('token').subscribe((data) => {
      this.tipoproducto = data;
    });

    //listar marcas
    this.marcaService.listar('token').subscribe((data) => {
      this.marca = data;
    });

    //listar etiquetas
    this.etiquetaService.listar('token').subscribe((data) => {
      this.etiquetas = data;
    });

    //listar colores
    this.colorService.getColor('token').subscribe((data) => {
      this.colores = data.filter((color) => color.vista_item !== '');
    });

    //listar categorias
    this.categoriaService.listar('token').subscribe((data) => {
      this.categorias = data;
      this.items = this.categorias.map((categoria) => {
        return {
          label: categoria.nombreItem,
          icon: categoria.abreviItem,
          command: () => {
            this.seleccion = categoria.abreviItem;
            this.categoriaActual = categoria.vistaItem;
            this.filtrar(this.seleccion);
          },
        };
      });
    });

    this.route.queryParams.subscribe((params) => {
      this.seleccion = this.encryp.decrypt(String(params['categoria']));
      console.log(
        '🔥 > StoreComponent > this.route.queryParams.subscribe > this.seleccion:',
        this.seleccion
      );
      switch (this.seleccion) {
        case 'CAB':
          this.categoriaActual = 'Caballeros';
          break;
        case 'DAM':
          this.categoriaActual = 'Damas';
          break;
        case 'NIÑ':
          this.categoriaActual = 'Niños y Niñas';
          break;
        case 'ACC':
          this.categoriaActual = 'Accesorios';
          break;
        default:
          this.categoriaActual = 'Todas las categorias';
          break;
      }
      this.filtrar(this.seleccion);
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

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
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

  onPageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.pageSize = event.rows;
    console.log(this.seleccion);
    this.filtrar(this.seleccion);
  }

  filtrar(categoria: string) {
    console.log('🔥 > StoreComponent > filtrar > categoria:', categoria);
    this.listarProductos(categoria);
  }

  valuesEtiqueta: any[] = [];
  abreviaturasEtiqueta: any[] = [];
  updateValuesEtiquetas() {
    if (this.selectedEtiqueta) {
      const newItem = this.selectedEtiqueta.vistaItem;
      if (!this.valuesEtiqueta.includes(newItem)) {
        this.valuesEtiqueta.push(newItem);
        this.abreviaturasEtiqueta.push(this.selectedEtiqueta.abreviItem);
        this.filtrar(this.seleccion);
      }
    }
  }

  //etiqwuetas de filtrado
  removeEtiqueta(etiqueta: string) {
    const index = this.valuesEtiqueta.indexOf(etiqueta);
    if (index !== -1) {
      this.valuesEtiqueta.splice(index, 1);
      this.abreviaturasEtiqueta.splice(index, 1);
      this.filtrar(this.seleccion);
    }
  }

  valuestalla: any[] = [];
  abreviaturastalla: any[] = [];
  updateValuestalla() {
    if (this.selectedtalla) {
      const newItem = this.selectedtalla.vistaItem;
      if (!this.valuestalla.includes(newItem)) {
        this.valuestalla.push(newItem);
        this.abreviaturastalla.push(this.selectedtalla.abreviItem);
        this.filtrar(this.seleccion);
      }
    }
  }

  //etiqwuetas de filtrado
  removetalla(talla: string) {
    const index = this.valuestalla.indexOf(talla);
    if (index !== -1) {
      this.valuestalla.splice(index, 1);
      this.abreviaturastalla.splice(index, 1);
      this.filtrar(this.seleccion);
    }
  }

  valuesmarca: any[] = [];
  abreviaturasmarca: any[] = [];
  updateValuesmarca() {
    if (this.selectedmarca) {
      const newItem = this.selectedmarca.vistaItem;
      if (!this.valuesmarca.includes(newItem)) {
        this.valuesmarca.push(newItem);
        this.abreviaturasmarca.push(this.selectedmarca.abreviItem);
        this.filtrar(this.seleccion);
      }
    }
  }

  //etiqwuetas de filtrado
  removemarca(marca: string) {
    const index = this.valuesmarca.indexOf(marca);
    if (index !== -1) {
      this.valuesmarca.splice(index, 1);
      this.abreviaturasmarca.splice(index, 1);
      this.filtrar(this.seleccion);
    }
  }

  valuestipoproducto: any[] = [];
  abreviaturastipoproducto: any[] = [];
  updateValuestipoproducto() {
    if (this.selectedtipoproducto) {
      const newItem = this.selectedtipoproducto.vistaItem;
      if (!this.valuestipoproducto.includes(newItem)) {
        this.valuestipoproducto.push(newItem);
        this.abreviaturastipoproducto.push(
          this.selectedtipoproducto.abreviItem
        );
        this.filtrar(this.seleccion);
      }
    }
  }

  //etiqwuetas de filtrado
  removetipoproducto(tipoproducto: string) {
    const index = this.valuestipoproducto.indexOf(tipoproducto);
    if (index !== -1) {
      this.valuestipoproducto.splice(index, 1);
      this.abreviaturastipoproducto.splice(index, 1);
      this.filtrar(this.seleccion);
    }
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
}
