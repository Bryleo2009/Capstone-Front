import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { CarritoFilter } from '@app/_model/carritoFilter';

@Injectable({
  providedIn: 'root'
})
export class CarritoFilterService {
  url:string = `${environment.HOST_URL}/ProductoTallaColor`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<CarritoFilter[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CarritoFilter[]>(this.url, { headers });
  }

  listarPorId(id: string, token: string): Observable<CarritoFilter> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CarritoFilter>(`${this.url}/${id}`, { headers });
  }

  registrar(objeto: CarritoFilter, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,objeto, { headers });
  }

  modificar(objeto: CarritoFilter, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,objeto, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }
  carritoStock(objeto: CarritoFilter, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}/carrito`,objeto, { headers });
  }
}
