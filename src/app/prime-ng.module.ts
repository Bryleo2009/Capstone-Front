import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ImageModule
  ],exports: [
    ButtonModule,
    ImageModule
  ]
})
export class PrimeNGModule { }
