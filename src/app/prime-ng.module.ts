import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    ImageModule,
    CardModule,
    CheckboxModule,
    InputNumberModule,
    PaginatorModule,
    DropdownModule

  ],exports: [
    ButtonModule,
    ImageModule,
    CardModule,
    CheckboxModule,
    InputNumberModule,
    PaginatorModule,
    DropdownModule
  ]
})
export class PrimeNGModule { }
