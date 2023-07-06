import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@app/_service/modelos/data.service';
import { AuthService } from '@app/_service/rutas/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent {
  menuItems: MenuItem[];

  constructor(
    private router: Router,
    private almacen: AuthService,
    private dataService: DataService
  ) {
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: '/dash'
      },
      {
        label: 'Agregar Productos',
        icon: 'pi pi-users',
        routerLink: '/dash/productos'
      },
      {
        label: 'Cerrar Sesion',
        icon: 'pi pi-cog',
        command: () => {
          this.almacen.removeAll();
          this.router.navigateByUrl('/login');
          this.dataService.updateVariable(false);
      }
      }
    ];
  }
}
