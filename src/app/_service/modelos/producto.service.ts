import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Categoria } from '@app/_model/categoria';
import { Producto } from '@app/_model/producto';
import { Page } from '@app/_model/Page';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url:string = `${environment.HOST_URL}/Productos`;

  constructor(private http: HttpClient) { }

  listar(page: number, pageSize: number,token: string): Observable<Page<Producto>> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = {
      pageNo: `${page}`,
      pageSize: `${pageSize}`
    };
    return this.http.get<Page<Producto>>(this.url, { headers, params });
  }

  listarPorId(id: number, token: string): Observable<Producto> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Producto>(`${this.url}/${id}`, { headers });
  }

  registrar(Rol: Producto, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,Rol, { headers });
  }

  modificar(Rol: Producto, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,Rol, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }
}
