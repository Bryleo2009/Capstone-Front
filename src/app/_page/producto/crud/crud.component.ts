import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Cliente } from '@app/_model/cliente';
import { Enum } from '@app/_model/enum';
import { Rol } from '@app/_model/rol';
import { Departamento } from '@app/_model/ubigeo/departamento';
import { Distrito } from '@app/_model/ubigeo/distrito';
import { Provincia } from '@app/_model/ubigeo/privincia';
import { Usuario } from '@app/_model/usuario';
import { ClienteService } from '@app/_service/modelos/cliente.service';
import { AuthService } from '@app/_service/rutas/auth.service';
import { AppComponent } from '@app/app.component';
import { environment } from '@env/environment.development';
import { GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { ProductoFilter } from '@app/_model/filter/productoFilter';
import { RegistroProductFilter } from '@app/_model/filter/registroProductFilter';
import { Producto } from '@app/_model/producto';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent {


  checked!: boolean;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private principal: AppComponent,
    private serviceCliente: ClienteService,
    private serviceProducto: ProductoService,
    private auth: AuthService,
    private router: Router
  ) {}
  formRegistro!: FormGroup;

  ngOnInit() {

    this.formRegistro = new FormGroup({
      descripcionProduct: new FormControl({
        value: '',
        disabled: false,
      }),
      nombre_product: new FormControl({
        value: '',
        disabled: false,
      }),
      precio_uni: new FormControl({
        value: '',
        disabled: false,
      }),
      precio_descu_product: new FormControl({
        value: '',
        disabled: false,
      }),
      existe: new FormControl({
        value: true,
        disabled: false,
      }),
      imagen: new FormControl({
        value: '',
        disabled: false,
      }),
      categoria: new FormControl({
        value: '',
        disabled: false,
      }),
      marca: new FormControl({
        value: '',
        disabled: false,
      }),
      tipoProduct: new FormControl({
        value: '',
        disabled: false,
      }),
      etiquetas: new FormControl({
        value: '',
        disabled: false,
      }),
      cantidad: new FormControl({
        value: '',
        disabled: false,
      }),
      tallas: new FormControl({
        value: '',
        disabled: false,
      }),
      color: new FormControl({
        value: '',
        disabled: false,
     }),
    });
  }

  @Input() flexWrap: boolean = false;

  unProducto: Producto = new Producto();
  unRegistro: RegistroProductFilter = new RegistroProductFilter ();

  registrar(){
    
    this.unProducto.descripcionProduct = this.formRegistro.value['descripcionProduct'];
    this.unProducto.nombreProduct= this.formRegistro.value['nombreProduct'];
    this.unProducto.precioUni= this.formRegistro.value['precioUni'];
    this.unProducto.precioDescuProduct= this.formRegistro.value['precioDescuProduct'];
    this.unProducto.imagen= this.formRegistro.value['imagen'];
    this.unProducto.idCateg= this.formRegistro.value['idCateg'];
    this.unProducto.idTipoProduc= this.formRegistro.value['idTipoProduc'];
    this.unProducto.idEtiqueta= this.formRegistro.value['idEtiqueta'];
    this.unProducto.idMarca= this.formRegistro.value['idMarca'];
    //seteando unProducto a unRegistro
    this.unRegistro.producto	 =  this.unProducto;

    console.log("🔥 > CRUDComponent > unProducto:", this.unProducto)
    this.serviceProducto.registrar(this.unRegistro, this.auth.getToken()).subscribe(
      (data) => {
        console.log("🔥 > CRUDComponent > registrar > data:", data)
        Swal.fire({
          title: 'Producto creado',
          text: 'Producto registrado:)',
          icon: 'success',
          confirmButtonText: 'Ok',
          showCloseButton: true,
        }).then((result) => {
          if (result.isConfirmed) {            
            this.router.navigate(['store']);
          }
        });
      }, (error) => {
        this.principal.mensaje('error', 'Error en registro de producto', error.mensaje);
      }
    );
  }
/*
  generarUserPass(nombre?: string, apellido?: string, fecha?: Date) {
    let userpass = '';
    if (nombre !== undefined) {
      const primeraLetraNombre = nombre.charAt(0);
      const apellidoSinAcentos = apellido?.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Eliminar acentos en el apellido
      const apellidoSinEspacios = apellidoSinAcentos?.replace(/\s/g, ''); // Eliminar espacios en el apellido
      userpass = primeraLetraNombre + apellidoSinEspacios + fecha?.getDate() + fecha?.getMonth() + fecha?.getFullYear();
    }
    return userpass;
  }*/
  
}
