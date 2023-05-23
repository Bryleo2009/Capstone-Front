import { Component } from '@angular/core';
import { TimelineModule } from 'primeng/timeline';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { ProductoFilter } from '@app/_model/filter/productoFilter';
import { EncryptionService } from '@app/_service/util/encryption.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent  {
  events1: any[];
  productos!: ProductoFilter[];
  
  constructor() {
    
    this.events1 = [
      { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
      { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
      { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
      { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
  ];

        
  }
}
