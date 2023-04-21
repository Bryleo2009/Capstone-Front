import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { SplitButtonModule } from 'primeng/splitbutton';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    GalleriaModule,
    CarouselModule,
    SplitButtonModule

  ],exports: [
    ButtonModule,
    GalleriaModule,
    CarouselModule,
    SplitButtonModule
  ]
})
export class PrimeNGModule { }
