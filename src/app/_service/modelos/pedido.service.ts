import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Pedido } from '@app/_model/pedido';
import { PedidoFilter } from '@app/_model/filter/pedidoFilter';


@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  url:string = `${environment.HOST_URL}/Pedidos`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<Pedido[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Pedido[]>(this.url);
  }

  listarPorId(id: string, token: string): Observable<Pedido> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Pedido>(`${this.url}/${id}`);
  }

  registrar(pedido: PedidoFilter, iuc: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set("iuc", iuc);
    return this.http.post(`${this.url}`,pedido, { headers, params });
  }

  modificar(Rol: Pedido, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,Rol, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }
}