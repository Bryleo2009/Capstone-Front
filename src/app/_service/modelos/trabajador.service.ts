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
export class TrabajadorService {

  url:string = `${environment.HOST_URL}/Trabajadors`;

  constructor(private http: HttpClient) { }


  byNum(id: string, token: string): Observable<Cliente> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Cliente>(`${this.url}/byNum/${id}`);
  }

}
