import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-trazaProduct',
  templateUrl: './trazaProduct.component.html',
  styleUrls: ['./trazaProduct.component.css'],
})
export class TrazaProductComponent implements OnInit {
  constructor(public messageService: MessageService) {}

  items!: MenuItem[];
  ngOnInit() {
    this.items = [
      {
        label: 'Productos',
        routerLink: 'pedido',
      },
      {
        label: 'Datos de entrega',
        routerLink: 'entrega',
      },
      {
        label: 'Pago',
        routerLink: 'payment',
      },
      {
        label: 'Confirmacion',
        routerLink: 'ok',
      },
    ];
  }
}
