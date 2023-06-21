import { ClienteService } from './../modelos/cliente.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { UsuarioService } from '../modelos/usuario.service';

interface RouteData {
  expectedRoles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private usuario: UsuarioService, private cliente: ClienteService) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const token = this.authService.getToken();
    let userRoles: string;
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      const unUsuario = await this.usuario.byUsername(user.sub,this.authService.getToken()).toPromise();
      const unCliente = await this.cliente.byNum(unUsuario?.username  ?? 'admin',this.authService.getToken()).toPromise();
      if (unCliente) {
        this.authService.setCliente(unCliente ?? "");
        this.authService.setRol(unUsuario?.idRol.identItem.substring(5) ?? "");
        if (unUsuario !== undefined) {
          this.authService.setUser(unUsuario);
        } else {
          // Manejar el caso en el que data sea undefined
          // Por ejemplo, mostrar un mensaje de error o asignar un valor por defecto
        }
        
      }      
      if (unUsuario && unUsuario.idRol && unUsuario.idRol.identItem) {
        userRoles = unUsuario.idRol.identItem.substring(5);
        const expectedRoles = (route.data as RouteData).expectedRoles;
        if (expectedRoles.some((role) => userRoles.includes(role))) {
          return true;
        } else {
          let subRuta =  window.location.pathname.split('/').slice(0,3).join('/') + '/';
          this.router.navigate([subRuta + 'error',"403"]);
          return false;
        }
      } else {
        let subRuta =  window.location.pathname.split('/').slice(0,3).join('/') + '/';
          this.router.navigate([subRuta + 'error',"403"]);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}


