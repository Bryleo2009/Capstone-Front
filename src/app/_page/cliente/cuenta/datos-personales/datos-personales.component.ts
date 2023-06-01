import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '@app/_model/cliente';
import { ClienteService } from '@app/_service/modelos/cliente.service';
import { AuthService } from '@app/_service/rutas/auth.service';
import { AppComponent } from '@app/app.component';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private clienteService: ClienteService,
    private general: AppComponent,
    ){}

  ngOnInit(): void {
    console.log(this.authService.getCliente())
    this.formDatos = new FormGroup({
      nombres: new FormControl({
        value: this.authService.getCliente().nombre,
        disabled: false,
      }),
      apellido: new FormControl({
        value: this.authService.getCliente().apellido,
        disabled: false,
      }),
      email: new FormControl({
        value: this.authService.getCliente().correo,
        disabled: true,
      }),
      fecha: new FormControl({
        value: new Date(this.authService.getCliente().fechaNac),
        disabled: true,
      }),
      numDoc: new FormControl({
        value: this.authService.getCliente().numDocumento,
        disabled: true,
      }),
      celular: new FormControl({
        value: this.authService.getCliente().telefono,
        disabled: false,
      })
    });
  }
  
  
  date: Date = new Date();
  formDatos!: FormGroup;
  unCliente: Cliente = new Cliente();
  guardar(){

    this.formDatos.get('numDoc')?.enable();
    this.formDatos.get('email')?.enable();
    this.formDatos.get('fecha')?.enable();
    this.unCliente = this.authService.getCliente();
    this.unCliente.nombre = this.formDatos.value['nombres'];
    this.unCliente.apellido = this.formDatos.value['apellido'];
    this.unCliente.fechaNac = this.formDatos.value['fecha'];
    this.unCliente.telefono = this.formDatos.value['celular'];
    this.unCliente.correo = this.formDatos.value['email'];
    this.unCliente.numDocumento = this.formDatos.value['numDoc'];
    this.clienteService.modificar(this.unCliente, this.authService.getToken()).subscribe(
      (data)=> {
        this.general.mensaje('success', 'Usuario Modificado', 'El usuario ha sido modificado con éxito');
        this.formDatos.get('numDoc')?.disable();
        this.formDatos.get('email')?.disable();
        this.formDatos.get('fecha')?.disable();
        location.reload();
      }, (error) => {
        console.log(error);
      }
    );
  }



}
