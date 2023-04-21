import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNGModule } from './prime-ng.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Details01Component } from './_page/details01/details01.component';

@NgModule({
  declarations: [
    AppComponent,
    Details01Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
  ],exports: [
    PrimeNGModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
