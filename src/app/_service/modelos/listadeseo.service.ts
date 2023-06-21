import { Injectable } from '@angular/core';
import { EnumInter } from '@app/_model/enum';
import { ProductoStorage } from '@app/_model/filter/productoStorage';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListaDeseoService {

  private listadeseo: ProductoStorage[] = [];
  private listadeseoSubject: BehaviorSubject<ProductoStorage[]> = new BehaviorSubject<ProductoStorage[]>(this.listadeseo);
  carrito$: Observable<ProductoStorage[]> = this.listadeseoSubject.asObservable();

  constructor() {
    this.obtenerListadeseoLocalStorage();
  }

  private obtenerListadeseoLocalStorage() {
    const carritoString = localStorage.getItem('carrito');
    if (carritoString) {
      this.listadeseo = JSON.parse(carritoString);
      this.listadeseoSubject.next(this.listadeseo);
    }
  }

  private guardarListadeseoLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(this.listadeseo));
  }

  agregarAlListadeseo(id: number, cantidad: number,colorid:EnumInter, tallaid:EnumInter) {
    const index = this.listadeseo.findIndex((producto) => producto.idProduct === id && producto.tallaid === tallaid.id_talla && producto.colorid === colorid.id_color);

    if (index !== -1) {
      this.listadeseo[index].cantProduct = cantidad;
    } else {
      const producto: ProductoStorage = { idProduct: id, cantProduct: cantidad, colorid: colorid.id_color, tallaid: tallaid.id_talla };
      this.listadeseo.push(producto);
    }

    this.guardarListadeseoLocalStorage();
    this.listadeseoSubject.next(this.listadeseo);
  }

  obtenerCantidadTotalListaDeseo(): number {
    return this.listadeseo.reduce((total, producto) => total + producto.cantProduct, 0);
  }

  obtenerProductosListadeseo(): ProductoStorage[] {
    return this.listadeseo;
  }

  limpiarListaDeseo() {
    this.listadeseo = [];
    this.guardarListadeseoLocalStorage();
    this.listadeseoSubject.next(this.listadeseo);
  }
  
}
