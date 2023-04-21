import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../_model/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  url:string = `${environment.HOST_URL}/Usuarios`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<Usuario[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario[]>(this.url, { headers });
  }

  listarPorId(id: string, token: string): Observable<Usuario> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(`${this.url}/${id}`, { headers });
  }

  registrar(Usuario: Usuario, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,Usuario, { headers });
  }

  modificar(Usuario: Usuario, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,Usuario, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }


  byUsername(id: string, token: string): Observable<Usuario> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Usuario>(`${this.url}/byUsername/${id}`, { headers });
  }
}
