import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { ColorService } from '../../_service/modelos/color.service';

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
    private etiquetaService: EtiquetaService,
    private colorService: ColorService,
    private cdRef: ChangeDetectorRef
  ) {}
  rangeValues: number[] = [20, 80];
  selectedCategories: any[] = [];
  categories!: any[];
  selectedCategoriesTalla: any[] = [];
  selectedCategoriesColors: any[] = [];
  categoriesTalla!: any[];
  categoriaActual: string = 'Caballeros';
  precioMin: number = 10;
  precioMax: number = 1000;
  categorias!: Enum[];
  colores!: Colors[];
  tallas!: Enum[];
  marcas!: Enum[];
  etiquetas!: Enum[];
  productos!: ProductoFilter[];
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  rows: number = 12;
  selectedCountry!: Enum;
  ngOnInit(): void {
    this.updateValues(); // llama a la función para asegurarte de que los valores iniciales se muestren en el chip

    //listar categorias
    this.categoriaService.listar('token').subscribe((data) => {
      this.categorias = data;
    });

    //listar tallas
    this.tallaService.listar('token').subscribe((data) => {
      this.categoriesTalla = data;
    });

    //listar marcas
    this.marcaService.listar('token').subscribe((data) => {
      this.categories = data;
    });

    //listar etiquetas
    this.etiquetaService.listar('token').subscribe((data) => {
      this.etiquetas = data.filter(
        (etiqueta) => !etiqueta.identItem.startsWith('COLOR')
      );
    });

    //listar colores
    this.colorService.getColor('token').subscribe((data) => {
      this.colores = data;
    });

    //listar productos
    this.listarProductos();
  }

  listarProductos(): void {
    this.productoService
      .listar(
        'CAB',
        [],
        this.abreviaturas,
        this.selectedCategoriesTalla,
        this.selectedCategories,
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
    this.listarProductos();
  }

  filtrar() {
    //listar productos
    this.listarProductos();
  }

  values: any[] = [];
  abreviaturas: any[] = [];
  updateValues() {
    if (this.selectedCountry) {
      const newItem = this.selectedCountry.vistaItem;
      if (!this.values.includes(newItem)) {
        this.values.push(newItem);
        this.abreviaturas.push(this.selectedCountry.abreviItem);
        this.filtrar();
      }
    }
  }

  removeEtiqueta(etiqueta: string) {
    const index = this.values.indexOf(etiqueta);
    if (index !== -1) {
      this.values.splice(index, 1);
      this.abreviaturas.splice(index, 1);
      this.filtrar();
    }
  }
}
