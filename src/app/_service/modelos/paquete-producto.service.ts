import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Pedido } from '@app/_model/pedido';
import { PaqueteFilter } from '@app/_model/filter/paqueteFilter';


@Injectable({
  providedIn: 'root'
})
export class PaqueteProductoService {

  url:string = `${environment.HOST_URL}/PaqueteProductos`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<PaqueteFilter[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<PaqueteFilter[]>(this.url);
  }

  registrar(paqueteProducto: PaqueteFilter, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,paqueteProducto, { headers });
  }

}