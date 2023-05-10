import { Component } from '@angular/core';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent {
  events: any[];

  constructor() {
      this.events = [
          { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg', parrafo: 'a' },
          { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7', parrafo: 'ab' },
          { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800', parrafo: 'ac' },
          { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B', parrafo: 'ad' }
      ];
  }
}
