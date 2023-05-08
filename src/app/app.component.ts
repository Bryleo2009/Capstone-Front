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
  contCarrito: number = 0;
  ngOnInit(): void {
    this.actualizarCarrito();
  }

  actualizarCarrito(){
    const listaProductosString = localStorage.getItem('listaProductos');

    if (listaProductosString !== null) {
      const listaProductos = JSON.parse(listaProductosString);
      let cantidadTotal = 0; // Variable para almacenar la cantidad total de productos

      for (const producto of listaProductos) {
        cantidadTotal += producto.cantProduct; // Suma la cantidad de cada producto
      }

      this.contCarrito = cantidadTotal;
      console.log("🔥 > AppComponent > ngOnInit > cantidadTotal:", cantidadTotal)
    }

    this.carritoService.actualizarContCarrito(this.contCarrito);
  }


  carrito: ProductoStorage[] = [];
  cantidadProd: number = 0;
  agregarAlCarrito(id: number, cant: number) {
    // Verificar si el producto ya existe en el carrito
    const index = this.carrito.findIndex(
      (producto) => producto.idProduct === id
    );

    if (index !== -1) {
      // El producto ya existe, actualizar la cantidad
      this.carrito[index].cantProduct = cant;
    } else {
      // El producto no existe, agregarlo al carrito
      const producto: ProductoStorage = {
        idProduct: id,
        cantProduct: cant,
      };
      this.carrito.push(producto);
    }

    // Guarda la lista de productos en el Local Storage
    localStorage.setItem('listaProductos', JSON.stringify(this.carrito));

    this.messageService.add({
      severity: 'success',
      summary: 'Registrado!',
      detail: 'Producto agregado al carrito',
    });

    const cantidadTotal = this.contador(this.carrito); // Calcular la cantidad total utilizando la función contador
    this.carritoService.actualizarContCarrito(cantidadTotal); // Actualizar el valor del carrito en el CarritoService
  }

  contador(carrito: ProductoStorage[]): number {
    let cantidadTotal = 0;
    for (let i = 0; i < carrito.length; i++) {
      cantidadTotal += carrito[i].cantProduct;
    }
    return cantidadTotal;
  }
}
