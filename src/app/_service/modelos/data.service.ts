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
  private ubigeo!: string; 
  enviar_ubigeo(dato:string){
    this.ubigeo = dato;
  }

  obtener_ubigeo(){
    return this.ubigeo;
  }

  /*Variable nombreRecojo*/
  private nombreRecojo!:string;
  enviar_nombreRecojo(dato: string){
    this.nombreRecojo=dato;
  }
  obtener_nombreRecojo(){
    return this.nombreRecojo;
  }

    /*Variable apellidoRecojo*/
    private apellidoRecojo!:string;
    enviar_apellidoRecojo(dato: string){
      this.apellidoRecojo=dato;
    }
    obtener_apellidoRecojo(){
      return this.apellidoRecojo;
    }

      /*Variable celularRecojo*/
    private celularRecojo!:string;
    enviar_celularRecojo(dato: string){
      this.celularRecojo=dato;
    }
    obtener_celularRecojo(){
      return this.celularRecojo;
    }

    /*Variable correoRecojo*/
    private correoRecojo!:string;
    enviar_correoRecojo(dato: string){
      this.correoRecojo=dato;
    }
    obtener_correoRecojo(){
      return this.correoRecojo;
    }

    /*Variable direccionRecojo*/
    private direccionRecojo!:string;
    enviar_direccionRecojo(dato: string){
      this.direccionRecojo=dato;
    }
    obtener_direccionRecojo(){
      return this.direccionRecojo;
    }
}
