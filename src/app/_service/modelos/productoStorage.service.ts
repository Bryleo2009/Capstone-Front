import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ProductoStorage } from '@app/_model/filter/productoStorage';

@Injectable({
  providedIn: 'root'
})
export class ProductoStorageService {
  url:string = `${environment.HOST_URL}/ProductoTallaColor`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<ProductoStorage[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ProductoStorage[]>(this.url, { headers });
  }

  listarPorId(id: string, token: string): Observable<ProductoStorage> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ProductoStorage>(`${this.url}/${id}`, { headers });
  }

  registrar(objeto: ProductoStorage, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,objeto, { headers });
  }

  modificar(objeto: ProductoStorage, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,objeto, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }

  carritoStock(objeto: ProductoStorage[], token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}/carrito`,objeto, { headers });
  }
}
