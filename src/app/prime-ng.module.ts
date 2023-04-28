import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ChipsModule } from 'primeng/chips';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    GalleriaModule,
    CarouselModule,
    SplitButtonModule,
    ImageModule,
    CardModule,
    CheckboxModule,
    InputNumberModule,
    PaginatorModule,
    DropdownModule,
    DividerModule,
    ChipModule,
    SelectButtonModule,
    ChipsModule,

  ],exports: [
    ButtonModule,
    GalleriaModule,
    CarouselModule,
    SplitButtonModule,
    ImageModule,
    CardModule,
    CheckboxModule,
    InputNumberModule,
    PaginatorModule,
    DropdownModule,
    DividerModule,
    ChipModule,
    SelectButtonModule,
    ChipsModule,
  ]
})
export class PrimeNGModule { }
