import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Categoria } from '@app/_model/categoria';
import { Producto } from '@app/_model/producto';
import { Page } from './../../_model/page';
import { ProductoFilter } from '@app/_model/filter/productoFilter';
import { ProductoStorage } from '@app/_model/filter/productoStorage';
import { ColorTallaFilter } from '@app/_model/filter/collorTallaFilter';


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
    colores: string[],
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
      colores: `${colores}`,
      menorPrecio: `${menorPrecio}`,
      mayorPrecio: `${mayorPrecio}`,
      cantidad: `${cantidad}`,
      pagina: `${pagina}`,
    };
    return this.http.get<Page<ProductoFilter>>(this.url, { params });
  }
  
 
  listarGeneral(token: string): Observable<Producto[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Producto[]>(`${this.url}/listar`);
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

  listarRandom(
    categoria: string,
    cantidad: number,
    token: string): Observable<ProductoFilter[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = {
      categoria: `${categoria}`,
      cantidad: `${cantidad}`
    };
    return this.http.get<ProductoFilter[]>(`${this.url}/random`, { params });
  }

  carritoStock(objeto: ProductoStorage[], token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.url}/carrito`,objeto, { headers });
  }

  colorTalla(id: string, token:string):Observable<ColorTallaFilter[]>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ColorTallaFilter[]>(`${this.url}/stockPrendas/${id}`);

  }

  listarPorId(id: string, token: string): Observable<Producto> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

}
