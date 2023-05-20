import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

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
}
