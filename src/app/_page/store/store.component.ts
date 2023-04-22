import { Component, OnInit } from '@angular/core';
import { Categoria } from '@app/_model/categoria';
import { Producto } from '@app/_model/producto';
import { CategoriasService } from '@app/_service/modelos/categorias.service';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { TipoProductoService } from '@app/_service/modelos/tipo-producto.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  constructor(
    private categoriaService: CategoriasService,
    private productoService: ProductoService
  ){}
  rangeValues: number[] = [20, 80];
  selectedCategories: any[] = [];
  categories: any[] = [
      { name: 'Nike', key: 'N' },
      { name: 'Adidas', key: 'A' },
      { name: 'Doo Australia', key: 'Z' },
      { name: 'Denimlab', key: 'D' },
      { name: 'Newport', key: 'T' }
  ];
  selectedCategoriesTalla: any[] = [];
  categoriesTalla: any[] = [
      { name: 'S', key: 'S' },
      { name: 'M', key: 'M' },
      { name: 'L', key: 'L' },
      { name: 'XL', key: 'XL' },
  ];
  categoriaActual: string = 'Caballeros';
  value1: number = 40;
  value2: number = 100;
  categorias!: Categoria[];
  productos!: Producto[];
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  rows: number = 12;
  ngOnInit(): void {
    //listar categorias
    this.categoriaService.listar('token').subscribe((data) => {
      this.categorias = data;
    });

    //listar productos
    this.listarProductos();
  }

  listarProductos(): void {
    this.productoService.listar(this.first / this.pageSize, this.pageSize,'token').subscribe(
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

  

}
