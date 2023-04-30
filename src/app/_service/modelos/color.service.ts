import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Colors, Enum } from '@app/_model/enum';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  url:string = `${environment.HOST_URL}/Colors`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<Enum[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Enum[]>(this.url, { headers });
  }

  listarPorId(id: string, token: string): Observable<Enum> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Enum>(`${this.url}/${id}`, { headers });
  }

  registrar(objeto: Enum, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,objeto, { headers });
  }

  modificar(objeto: Enum, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,objeto, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }

  getColor(token: string): Observable<Colors[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Colors[]>(`${this.url}/colors`, { headers });
  }
}
