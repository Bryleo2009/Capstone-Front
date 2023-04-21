import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ImageModule,
    CardModule,
    SliderModule,
    CheckboxModule,
    InputNumberModule
  ],exports: [
    ButtonModule,
    ImageModule,
    CardModule,
    SliderModule,
    CheckboxModule,
    InputNumberModule
  ]
})
export class PrimeNGModule { }
