import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNGModule } from './prime-ng.module';
import { AppRoutingModule } from './app-routing.module';
import { GalleriaModule } from 'primeng/galleria';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Details01Component } from './_page/details/details.component';

import { HeaderComponent } from './_page/header/header.component';
import { StoreComponent } from './_page/store/store.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './_page/footer/footer.component';
import { HomeComponent } from './_page/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgImageSliderModule } from 'ng-image-slider';
import { CarritoComponent } from './_page/carrito/carrito.component';

@NgModule({
  declarations: [
    AppComponent,
    Details01Component,
    HeaderComponent,
    StoreComponent,
    FooterComponent,
    HomeComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    NgImageSliderModule,
    BrowserAnimationsModule
  ],exports: [
    PrimeNGModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
