import { Injectable } from '@angular/core';
import { EnumInter } from '@app/_model/enum';
import { ListadeseoStorage } from '@app/_model/filter/listapedidoStorage';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListadeseoService {

  private listadeseo: ListadeseoStorage[] = [];
  private listadeseoSubject: BehaviorSubject<ListadeseoStorage[]> = new BehaviorSubject<ListadeseoStorage[]>(this.listadeseo);
  listadeseo$: Observable<ListadeseoStorage[]> = this.listadeseoSubject.asObservable();

  constructor() {
    this.obtenerListadeseoLocalStorage();
  }

  private obtenerListadeseoLocalStorage() {
    const listadeseoString = localStorage.getItem('listadeseo');
    if (listadeseoString) {
      this.listadeseo = JSON.parse(listadeseoString);
      this.listadeseoSubject.next(this.listadeseo);
    }
  }

  private guardarListadeseoLocalStorage() {
    localStorage.setItem('listadeseo', JSON.stringify(this.listadeseo));
  }

  agregarAlListadeseo(id: number, cantidad: number,colorid:EnumInter, tallaid:EnumInter) {
    const index = this.listadeseo.findIndex((producto) => producto.idProduct === id && producto.tallaid === tallaid.id_talla && producto.colorid === colorid.id_color);

    if (index !== -1) {
      this.listadeseo[index].cantProduct = cantidad;
    } else {
      const producto: ListadeseoStorage = { idProduct: id, cantProduct: cantidad, colorid: colorid.id_color, tallaid: tallaid.id_talla };
      this.listadeseo.push(producto);
    }

    this.guardarListadeseoLocalStorage();
    this.listadeseoSubject.next(this.listadeseo);
  }

  obtenerCantidadTotaListadeseo(): number {
    return this.listadeseo.reduce((total, producto) => total + producto.cantProduct, 0);
  }

  obtenerProductosListadeseo(): ListadeseoStorage[] {
    return this.listadeseo;
  }

  limpiarListadeseo() {
    this.listadeseo = [];
    this.guardarListadeseoLocalStorage();
    this.listadeseoSubject.next(this.listadeseo);
  }
  
}