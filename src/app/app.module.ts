import { Error } from './_page/error/error';
import { RouterModule } from '@angular/router';
import { NgImageSliderModule } from 'ng-image-slider';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNGModule } from './prime-ng.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Details01Component } from './_page/producto/details/details.component';
import { HeaderComponent } from './_page/inicial/header/header.component';
import { StoreComponent } from './_page/producto/store/store.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './_page/inicial/footer/footer.component';
import { HomeComponent } from './_page/inicial/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SeguimientoComponent } from './_page/paqueteria/trazaProduct/seguimiento/seguimiento.component';
import { CarritoComponent } from './_page/paqueteria/carrito/carrito.component';
import { DialogComponent } from './_page/producto/store/dialog/dialog.component';
import { TrazaProductComponent } from './_page/paqueteria/trazaProduct/trazaProduct.component';
import { EntregaComponent } from './_page/paqueteria/trazaProduct/entrega/entrega.component';
import { PagoComponent } from './_page/paqueteria/trazaProduct/pago/pago.component';
import { DeseosComponent } from './_page/cliente/deseos/deseos.component';
import { PaqueteriaComponent } from './_page/paqueteria/paqueteria.component';
import { LoginComponent } from './_page/cliente/login/login.component';
import { SessionComponent } from './_page/cliente/login/session/session.component';
import { SessionStorageService } from 'ngx-webstorage';
import { AuthService } from './_service/rutas/auth.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AuthGuard } from './_service/rutas/auth-guard.service';
import { RegistroComponent } from './_page/cliente/login/registro/registro.component';


@NgModule({
  declarations: [
    AppComponent,
    Details01Component,
    Error,
    HeaderComponent,
    StoreComponent,
    FooterComponent,
    HomeComponent,
    SeguimientoComponent,
    CarritoComponent,
    DialogComponent,
    TrazaProductComponent,
    EntregaComponent,
    PagoComponent,
    DeseosComponent,
    PaqueteriaComponent,
    LoginComponent,
    SessionComponent,
    RegistroComponent
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    NgImageSliderModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
  ],exports: [
    PrimeNGModule,
  ],
  providers: [
    AppComponent,PaqueteriaComponent,AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
