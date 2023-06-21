import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Comprobante } from '@app/_model/comprobante';
import { ComprobanteFilter } from '@app/_model/filter/comprobanteFilter';


@Injectable({
  providedIn: 'root'
})
export class ComprobanteService {
  

  url:string = `${environment.HOST_URL}/Comprobantes`;
  private apiUrl = '';

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<Comprobante[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Comprobante[]>(this.url);
  }

  listarPorId(id: string, token: string): Observable<Comprobante> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Comprobante>(`${this.url}/${id}`);
  }

  registrar(comprobante: ComprobanteFilter, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,comprobante, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }
}