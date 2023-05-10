import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Comprobante } from '@app/_model/comprobante';


@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {

  url:string = `${environment.HOST_URL}/Comprobantes`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<[Comprobante]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<[Comprobante]>(this.url, { headers });
  }

  listarPorId(id: string, token: string): Observable<Comprobante> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Comprobante>(`${this.url}/${id}`, { headers });
  }

  registrar(Rol: Comprobante, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,Rol, { headers });
  }

  modificar(Rol: Comprobante, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,Rol, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }
}