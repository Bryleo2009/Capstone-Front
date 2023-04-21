import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNGModule } from './prime-ng.module';
import { AppRoutingModule } from './app-routing.module';
import { GalleriaModule } from 'primeng/galleria';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Details01Component } from './_page/details01/details01.component';

import { HeaderComponent } from './_page/header/header.component';
import { StoreComponent } from './_page/store/store.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './_page/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    Details01Component,
    HeaderComponent,
    StoreComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],exports: [
    PrimeNGModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
