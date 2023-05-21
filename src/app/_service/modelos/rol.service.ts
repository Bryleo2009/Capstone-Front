import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Rol } from '../../_model/rol';


@Injectable({
  providedIn: 'root'
})
export class RolService {

  url:string = `${environment.HOST_URL}/Rols`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<Rol[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Rol[]>(this.url);
  }

  listarPorId(id: string, token: string): Observable<Rol> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Rol>(`${this.url}/${id}`);
  }

  registrar(Rol: Rol, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,Rol, { headers });
  }

  modificar(Rol: Rol, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,Rol, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }
}
