import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, SelectItem } from 'primeng/api';
import { MegaMenuModule } from 'primeng/megamenu';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  items!: MegaMenuItem[];

  ngOnInit() {
    this.items = [
        {
            label: 'Datos Personales',
            icon: 'pi pi-fw pi-user',
            routerLink: '',
        },
        {
            label: 'Configurar mi cuenta',
            icon: 'pi pi-fw pi-lock',
            routerLink:'configuracion',  
        },
        {
            label: 'Mis compras',
            icon: 'pi pi-fw pi-gift',
            routerLink:'compras',
        }
    ];
}
}
