import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /*variable de verificacion de login*/
  private logeadoSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  logeado$: Observable<boolean> = this.logeadoSubject.asObservable();

  constructor() {
    const storedValue = localStorage.getItem('logeado');
    const initialValue = storedValue ? JSON.parse(storedValue) : false;
    this.logeadoSubject = new BehaviorSubject<boolean>(initialValue);
    this.logeado$ = this.logeadoSubject.asObservable();
  }

  updateVariable(value: boolean) {
    this.logeadoSubject.next(value);
    localStorage.setItem('logeado', JSON.stringify(value));
  }

  obtenerLogueado(): boolean {
    return this.logeadoSubject.getValue();
  }
  /*Variable de ubigeo*/
  private ubigeo = new Subject<string>(); 
  enviar_ubigeo(dato:string){
    this.ubigeo.next(dato);
  }

  obtener_ubigeo(){
    return this.ubigeo.asObservable();
  }

  /*Variable tipo comprobante*/
  private tipo_c = new Subject<boolean>();
  envio_tipocomprobante(dato: boolean){
    this.tipo_c.next(dato);
  }
  obtener_tipocomprobante(){
    return this.tipo_c.asObservable();
  }
}
