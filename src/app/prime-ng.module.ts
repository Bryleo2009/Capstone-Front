import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ImageModule,
    CardModule,
    PaginatorModule,
    DropdownModule,
    SliderModule
  ],exports: [
    ButtonModule,
    ImageModule,
    CardModule,
    PaginatorModule,
    DropdownModule,
    SliderModule
  ]
})
export class PrimeNGModule { }
