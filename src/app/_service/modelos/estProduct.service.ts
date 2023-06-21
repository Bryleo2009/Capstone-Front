import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Enum } from '@app/_model/enum';
//import { EstProduct } from '@app/_model/estProduct';


@Injectable({
  providedIn: 'root'
})
export class EstProductService {

  url:string = `${environment.HOST_URL}/EstEnvioProducts`;

  constructor(private http: HttpClient) { }

  listar(token: string): Observable<Enum[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Enum[]>(this.url);
  }
  
}
