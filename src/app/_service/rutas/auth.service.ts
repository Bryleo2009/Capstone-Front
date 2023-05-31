import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from '@app/_model/usuario';
import { Cliente } from '@app/_model/cliente';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private sessionStorage: SessionStorageService, private router: Router) {}

  tokenExpired = new Subject<boolean>();

  //eliminar todo
  public removeAll () {
    this.removeToken();
    this.removeCliente();
    this.removeRol();
    this.removeUser()
  }


  //almacenar el token en la sesion
  public setToken(token: string): void {
    console.log('Token almacenado:', token);
    this.sessionStorage.store('token', token);
  }

  public getToken(): string {
    const token = this.sessionStorage.retrieve('token');

    /*if (!token) {
      // Si no hay token, redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/']);
    }*/

    return token;
  }

  public removeToken(): void {
    this.sessionStorage.clear('token');
  }

  //almacenar el cliente en la sesion
  public setCliente(cliente: Cliente): void {
    this.sessionStorage.store('cliente', cliente);
  }

  public getCliente(): Cliente {
    return this.sessionStorage.retrieve('cliente');
  }

  public removeCliente(): void {
    this.sessionStorage.clear('cliente');
  }

  //almacenar rol
  public setRol(cliente: string): void {
    this.sessionStorage.store('rol', cliente);
  }

  public getRol(): string {
    return this.sessionStorage.retrieve('rol');
  }

  public removeRol(): void {
    this.sessionStorage.clear('rol');
  }

  //alamcenar username
  public setUser(usuario: Usuario): void {
    this.sessionStorage.store('user', usuario);
  }

  public getUser(): Usuario {
    return this.sessionStorage.retrieve('user');
  }

  public removeUser(): void {
    this.sessionStorage.clear('user');
  }

  //Cerrar sesión del usuario
  public logout(): void {
    this.removeAll();
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/']);
  }
}