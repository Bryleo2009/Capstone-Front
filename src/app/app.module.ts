import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNGModule } from './prime-ng.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './_page/header/header.component';
import { StoreComponent } from './_page/store/store.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StoreComponent
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
