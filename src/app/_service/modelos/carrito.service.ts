import { Injectable } from '@angular/core';
import { EnumInter } from '@app/_model/enum';
import { ProductoStorage } from '@app/_model/filter/productoStorage';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carrito: ProductoStorage[] = [];
  private carritoSubject: BehaviorSubject<ProductoStorage[]> = new BehaviorSubject<ProductoStorage[]>(this.carrito);
  carrito$: Observable<ProductoStorage[]> = this.carritoSubject.asObservable();

  constructor() {
    this.obtenerCarritoLocalStorage();
  }

  private obtenerCarritoLocalStorage() {
    const carritoString = localStorage.getItem('carrito');
    if (carritoString) {
      this.carrito = JSON.parse(carritoString);
      this.carritoSubject.next(this.carrito);
    }
  }

  private guardarCarritoLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  agregarAlCarrito(id: number, cantidad: number,colorid:EnumInter, tallaid:EnumInter) {
    const index = this.carrito.findIndex((producto) => producto.idProduct === id && producto.tallaid === tallaid.id_talla && producto.colorid === colorid.id_color);

    if (index !== -1) {
      this.carrito[index].cantProduct = cantidad;
    } else {
      const producto: ProductoStorage = { idProduct: id, cantProduct: cantidad, colorid: colorid.id_color, tallaid: tallaid.id_talla };
      this.carrito.push(producto);
    }

    this.guardarCarritoLocalStorage();
    this.carritoSubject.next(this.carrito);
  }

  obtenerCantidadTotalCarrito(): number {
    return this.carrito.reduce((total, producto) => total + producto.cantProduct, 0);
  }

  obtenerProductosCarrito(): ProductoStorage[] {
    return this.carrito;
  }

  limpiarCarrito() {
    this.carrito = [];
    this.guardarCarritoLocalStorage();
    this.carritoSubject.next(this.carrito);
  }
  
}