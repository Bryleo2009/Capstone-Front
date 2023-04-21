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
export class StoreComponent implements OnInit{

  constructor(
    private categoriaService: CategoriasService,
    private productoService: ProductoService
  ){}

  categorias!: Categoria[];
  productos!: Producto[];
  ngOnInit(): void {
    //listar categorias
    this.categoriaService.listar("token").subscribe((data) => {
      this.categorias = data;
    });

    //listar productos
    this.productoService.listar("token").subscribe((data) => {
      this.productos = data;
    });
  }
}
