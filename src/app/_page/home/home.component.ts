import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(
    private categoriaService: CategoriasService,
    private productoService: ProductoService,
    private tallaService: TallaService,
    private marcaService: MarcaService,
    private etiquetaService: EtiquetaService,
  ){}
  rangeValues: number[] = [20, 80];
  responsiveOptions: any[] = [];
  selectedCategories: any[] = [];
  categories!: any[];
  selectedCategoriesTalla: any[] = [];
  selectedCategoriesColors: any[] = [];
  categoriesTalla!: any[];
  categoriaActual: string = 'Caballeros';
  precioMin: number = 10;
  precioMax: number = 1000;
  categorias!: Enum[];
  marcas!: Enum[];
  productos!: Producto[];
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  rows: number = 12;
  ngOnInit(): void {
    //listar categorias
    this.categoriaService.listar('token').subscribe((data) => {
      this.categorias = data;
      console.log("🔥 > StoreComponent > this.categoriaService.listar > this.categorias:", this.categorias)
    });

    //listar marcas
    this.marcaService.listar('token').subscribe((data) => {
      this.categories = data;
      console.log("🔥 > StoreComponent > this.marcaService.listar > this.categories:", this.categories)
    });

    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
    //listar productos
    this.listarProductos();
  }

  listarProductos(): void {
    console.log("🔥 > StoreComponent > listarProductos > this.selectedCategories:", this.selectedCategoriesTalla)
    this.productoService.listarGeneral('token').subscribe(
      (response) => {
        this.productos = response;
        console.log(this.productos);
      },
      error => {
        console.error(error);
      }
    );
  }

  onPageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.pageSize = event.rows;
    this.listarProductos();
  }

  filtrar(){
    //listar productos
    this.listarProductos();
  }

}
