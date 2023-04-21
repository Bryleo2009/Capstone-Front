import { Component, OnInit } from '@angular/core';
import { Categoria } from '@app/_model/categoria';
import { CategoriasService } from '@app/_service/modelos/categorias.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit{

  constructor(
    private service: CategoriasService
  ){}

  categorias!: Categoria[];
  ngOnInit(): void {
      this.service.listar("token").subscribe((data) => {
        this.categorias = data;
      });
  }
}
