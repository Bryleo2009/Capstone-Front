import { Component, OnInit } from '@angular/core';
import { ProductoStorage } from './_model/filter/productoStorage';
import { CarritoService } from './_service/modelos/carrito.service';
import { MessageService } from 'primeng/api';
import { environment } from '@env/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Julgian SAC';

  constructor(
    private messageService: MessageService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
  }


  contador(carrito: ProductoStorage[]): number {
    let cantidadTotal = 0;
    for (let i = 0; i < carrito.length; i++) {
      cantidadTotal += carrito[i].cantProduct;
    }
    return cantidadTotal;
  }
}
