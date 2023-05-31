import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {
  value!: string;
}
