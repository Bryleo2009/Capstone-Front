import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private sessionStorage: SessionStorageService, private router: Router) {}

  tokenExpired = new Subject<boolean>();

  //eliminar todo
  public removeAll () {
    this.removeToken();
    this.removeNick();
    this.removeGen();
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

    if (!token) {
      // Si no hay token, redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/login']);
    }

    return token;
  }

  public removeToken(): void {
    this.sessionStorage.clear('token');
  }

  //almacenar el nick en la sesion
  public setNick(nick: string): void {
    this.sessionStorage.store('nick', nick);
  }

  public getNick(): string {
    return this.sessionStorage.retrieve('nick');
  }

  public removeNick(): void {
    this.sessionStorage.clear('nick');
  }

  //almacenar genero para foto
  public setGen(nick: string): void {
    this.sessionStorage.store('genero', nick);
  }

  public getGen(): string {
    return this.sessionStorage.retrieve('genero');
  }

  public removeGen(): void {
    this.sessionStorage.clear('genero');
  }

  //almacenar rol
  public setRol(nick: string): void {
    this.sessionStorage.store('rol', nick);
  }

  public getRol(): string {
    return this.sessionStorage.retrieve('rol');
  }

  public removeRol(): void {
    this.sessionStorage.clear('rol');
  }

  //alamcenar username
  public setUser(nick: string): void {
    this.sessionStorage.store('user', nick);
  }

  public getUser(): string {
    return this.sessionStorage.retrieve('user');
  }

  public removeUser(): void {
    this.sessionStorage.clear('user');
  }

  //Cerrar sesión del usuario
  public logout(): void {
    this.removeAll();
    // Redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}