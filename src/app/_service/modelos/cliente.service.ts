import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Cliente } from '@app/_model/cliente';
import { Usuario } from '@app/_model/usuario';
import { Token } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url:string = `${environment.HOST_URL}/Clientes`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<Cliente[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Cliente[]>(this.url);
  }

  listarPorId(id: string, token: string): Observable<Cliente> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  registrar(Rol: Cliente, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,Rol);
  }

  modificar(Rol: Cliente, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,Rol, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }

  byNum(id: string, token: string): Observable<Cliente> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Cliente>(`${this.url}/byNum/${id}`);
  }

  exitenciaXCorreo(correo: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set("correo", correo);
    return this.http.get(`${this.url}/existencia`, { params });
  }

  byCorreo(correo: string, token: string): Observable<Cliente> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Cliente>(`${this.url}/byCorreo/${correo}`);
  }
}
