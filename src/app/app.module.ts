import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNGModule } from './prime-ng.module';
import { AppRoutingModule } from './app-routing.module';
import { GalleriaModule } from 'primeng/galleria';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Details01Component } from './_page/producto/details/details.component';
import { NgxBraintreeModule } from 'ngx-braintree';
import { HeaderComponent } from './_page/inicial/header/header.component';
import { StoreComponent } from './_page/producto/store/store.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './_page/inicial/footer/footer.component';
import { HomeComponent } from './_page/inicial/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgImageSliderModule } from 'ng-image-slider';
import { PedidoshComponent } from './_page/paqueteria/pedidosh/pedidosh.component';
import { SeguimientoComponent } from './_page/paqueteria/seguimiento/seguimiento.component';
import { CarritoComponent } from './_page/paqueteria/carrito/carrito.component';
import { DialogComponent } from './_page/producto/store/dialog/dialog.component';
import { TrazaProductComponent } from './_page/paqueteria/trazaProduct/trazaProduct.component';
import { EntregaComponent } from './_page/paqueteria/trazaProduct/entrega/entrega.component';
import { PagoComponent } from './_page/paqueteria/trazaProduct/pago/pago.component';

@NgModule({
  declarations: [
    AppComponent,
    Details01Component,
    HeaderComponent,
    StoreComponent,
    FooterComponent,
    HomeComponent,
    PedidoshComponent,
    SeguimientoComponent,
    CarritoComponent,
    DialogComponent,
    TrazaProductComponent,
    EntregaComponent,
    PagoComponent
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
    NgxBraintreeModule
  ],exports: [
    PrimeNGModule
  ],
  providers: [
    AppComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
