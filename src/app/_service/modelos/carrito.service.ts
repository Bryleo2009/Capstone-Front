import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private carritoSubject: ReplaySubject<number> = new ReplaySubject<number>(1);
  carrito$: Observable<number> = this.carritoSubject.asObservable();

  constructor() { }

  actualizarContCarrito(cantidad: number) {
    this.carritoSubject.next(cantidad);
  }
}
