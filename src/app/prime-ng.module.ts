import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';


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
    SplitButtonModule,
    ImageModule,
    CardModule

  ]
})
export class PrimeNGModule { }
