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
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  constructor(
    private categoriaService: CategoriasService,
    private productoService: ProductoService,
    private tallaService: TallaService,
    private marcaService: MarcaService,
    private etiquetaService: EtiquetaService,
  ){}
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
  ngOnInit(): void {
    //listar categorias
    this.categoriaService.listar('token').subscribe((data) => {
      this.categorias = data;
      console.log("🔥 > StoreComponent > this.categoriaService.listar > this.categorias:", this.categorias)
    });

    //listar tallas
    this.tallaService.listar('token').subscribe((data) => {
      this.categoriesTalla = data;
      console.log("🔥 > StoreComponent > this.tallaService.listar > this.categoriesTalla:", this.categoriesTalla)
    });

    //listar marcas
    this.marcaService.listar('token').subscribe((data) => {
      this.categories = data;
      console.log("🔥 > StoreComponent > this.marcaService.listar > this.categories:", this.categories)
    });

    //listar etiquetas
    this.etiquetaService.listar('token').subscribe((data) => {
      this.etiquetas = data;
      console.log("🔥 > StoreComponent > this.etiquetaService.listar > this.etiquetas:", this.etiquetas)
    });

    //listar colores
    this.etiquetaService.getColor('token').subscribe((data) => {
       this.colores = data;
       console.log("🔥 > StoreComponent > this.etiquetaService.getColor > his.colores:", this.colores)
    });

    //listar productos
    this.listarProductos();
  }

  listarProductos(): void {
    console.log("🔥 > StoreComponent > listarProductos > this.selectedCategories:", this.selectedCategoriesTalla)
    this.productoService.listar('CAB',[],this.selectedCategoriesColors,this.selectedCategoriesTalla,this.selectedCategories,this.precioMin,this.precioMax,this.pageSize,this.first / this.pageSize,'token').subscribe(
      (response) => {
        this.productos = response.content;
        this.totalRecords = response.totalElements;
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
