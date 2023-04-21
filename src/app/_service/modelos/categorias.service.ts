import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Categoria } from '@app/_model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  url:string = `${environment.HOST_URL}/Categorias`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<Categoria[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Categoria[]>(this.url, { headers });
  }

  listarPorId(id: string, token: string): Observable<Categoria> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Categoria>(`${this.url}/${id}`, { headers });
  }

  registrar(Rol: Categoria, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,Rol, { headers });
  }

  modificar(Rol: Categoria, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,Rol, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }
}
