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
import { TabMenuModule } from 'primeng/tabmenu';
import { TooltipModule } from 'primeng/tooltip';
import { RatingModule } from 'primeng/rating';

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
    TabMenuModule,
    TooltipModule,
    RatingModule,

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
    TabMenuModule,
    TooltipModule,
    RatingModule,
  ]
})
export class PrimeNGModule { }
