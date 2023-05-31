import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../_model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url:string = `${environment.HOST_URL}/login`;

  constructor(private http: HttpClient) { }

  ingresar(Usuario: Login){
    return this.http.post(`${this.url}`,Usuario);
  }

  ingresarGoogle(Usuario: Login){
    return this.http.post(`${this.url}/google`,Usuario);
  }
}





