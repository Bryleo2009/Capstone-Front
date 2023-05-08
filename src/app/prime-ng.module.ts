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
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { BadgeModule } from 'primeng/badge';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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
    DataViewModule,
    TagModule,
    DynamicDialogModule,
    BadgeModule,
    ToastModule

    
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
    DataViewModule,
    TagModule,
    DynamicDialogModule,
    BadgeModule,
    ToastModule
    
    
  ],
  providers: [
    DialogService,
    MessageService],
})
export class PrimeNGModule { }
