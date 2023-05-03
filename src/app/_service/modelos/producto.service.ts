import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Categoria } from '@app/_model/categoria';
import { Producto } from '@app/_model/producto';
import { Page } from '@app/_model/page';
import { ProductoFilter } from '@app/_model/filter/productoFilter';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url:string = `${environment.HOST_URL}/Productos`;

  constructor(private http: HttpClient) { }

  listar(
    categoria: string,
    tipos: string[],
    etiquetas: string[],
    tallas: string[],
    marcas: string[],
    menorPrecio: number,
    mayorPrecio: number,
    cantidad: number,
    pagina: number,
    token: string): Observable<Page<ProductoFilter>> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = {
      categoria: `${categoria}`,
      tipos: `${tipos}`,
      etiquetas: `${etiquetas}`,
      tallas: `${tallas}`,
      marcas: `${marcas}`,
      menorPrecio: `${menorPrecio}`,
      mayorPrecio: `${mayorPrecio}`,
      cantidad: `${cantidad}`,
      pagina: `${pagina}`,
    };
    return this.http.get<Page<ProductoFilter>>(this.url, { headers, params });
  }

  listarPorId(id: string, token: string): Observable<Producto> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Producto>(`${this.url}/${id}`, { headers });
  }

  listarGeneral(token: string): Observable<Producto[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Producto[]>(`${this.url}/listar`, { headers });
  }

  registrar(Rol: Producto, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.url}`,Rol, { headers });
  }

  modificar(Rol: Producto, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}`,Rol, { headers });
  }

  eliminar(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.url}/${id}`, { headers });
  }
}
