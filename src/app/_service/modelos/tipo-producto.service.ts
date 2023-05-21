import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Categoria } from '@app/_model/categoria';
import { TipoProducto } from '@app/_model/tipoProducto';
import { Enum } from '@app/_model/enum';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  url:string = `${environment.HOST_URL}/TipoProductos`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<Enum[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Enum[]>(this.url);
  }

  listarPorId(id: string, token: string): Observable<Enum> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Enum>(`${this.url}/${id}`);
  }

  registrar(Rol: TipoProducto, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,Rol, { headers });
  }

  modificar(Rol: TipoProducto, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,Rol, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }
}
