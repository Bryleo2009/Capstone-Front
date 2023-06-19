import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Page } from '../../_model/page';
import { ProductoFilter } from '@app/_model/filter/productoFilter';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RegistroProductFilter } from '@app/_model/filter/registroProductFilter';
import { tallaColorFilter } from '@app/_model/filter/tallaColorFilter';

@Injectable({
  providedIn: 'root'
})
export class TallaColorService {
  url:string = `${environment.HOST_URL}/Productos`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<tallaColorFilter[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<tallaColorFilter[]>(this.url);
  }

  /*listarPorId(id: string, token: string): Observable<Producto> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  listarGeneral(token: string): Observable<Producto[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Producto[]>(`${this.url}/listar`);
  }*/

  registrar(registro: RegistroProductFilter, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,registro, { headers });
  }

  /*modificar(Rol: Producto, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,Rol, { headers });
  }
*/
  
}
