import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Cliente } from '@app/_model/cliente';
import { Producto } from '@app/_model/producto';
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
    //cargar JSOn de ubigeo
    /*this.http.get<Departamento[]>('./assets/ubigeo.json').subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.log('Error al cargar el archivo JSON:', error);
      }
    );*/
    this.formRegistro = new FormGroup({
      descripcion: new FormControl({
        value: '',
        disabled: false,
      }),
      nombre: new FormControl({
        value: '',
        disabled: false,
      }),
      precioU: new FormControl({
        value: '',
        disabled: false,
      }),
      precioD: new FormControl({
        value: false,
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
      idcategoria: new FormControl({
        value: '',
        disabled: false,
      }),
      idmarca: new FormControl({
        value: '',
        disabled: false,
      }),
      idtipoproducto: new FormControl({
        value: '',
        disabled: false,
      }),
      idetiqueta: new FormControl({
        value: '',
        disabled: false,
      }),
      cantidad: new FormControl({
        value: '',
        disabled: false,
      }),
      talla: new FormControl({
        value: '',
        disabled: false,
      }),
      color: new FormControl({
        value: '',
        disabled: false,
     }),
    });
  }
  //cargar combos ubigeo
  /*selectedDepartment: Departamento | undefined;
  selectedDistrict: Distrito | undefined;
  selectedProvince: Provincia | undefined;
  selectedDepartmentCode: string | undefined;
  selectedProvinceCode: string | undefined;
  selectedDistrictCode: string | undefined;
  districts: any[] = [];
  provinces: any[] = [];
  anti_depart: string | undefined;
  dataJson = environment.dataJSON;
  departments: Departamento[] = [];*/
  /*updateDistrictsAndProvinces() {
    this.districts = [];
    this.provinces = [];
    this.selectedDepartment = this.departments.find(
      (department) =>
        department.nombre_departamento ===
        this.selectedDepartment?.nombre_departamento
    ) as Departamento;
    if (this.anti_depart != this.selectedDepartment?.nombre_departamento) {
      this.selectedDistrict = this.districts[-1];
      this.selectedProvince = this.provinces[-1];
      this.anti_depart = this.selectedDepartment?.nombre_departamento;
    }
    if (this.selectedDepartment && this.selectedDepartment.provincias) {
      this.provinces = this.selectedDepartment.provincias.filter((p) => p);
      this.selectedDepartmentCode = this.selectedDepartment.cod;
    }
    if (this.selectedProvince && this.selectedProvince.distritos) {
      this.districts = this.selectedProvince.distritos.filter((d) => d);
      this.selectedProvinceCode = this.selectedProvince.cod;
    }
    if (this.selectedDistrict) {
      this.selectedDistrictCode = this.selectedDistrict.cod;
      console.log(
        'ubigeo seleccionado: >',
        this.selectedDepartmentCode,
        this.selectedProvinceCode,
        this.selectedDistrictCode
      );
    }
  }*/

  @Input() flexWrap: boolean = false;


  unCliente: Cliente = new Cliente ();
  unProducto: Producto = new Producto ();
  unUsuario: Usuario = new Usuario();
  unRol: Enum = new Enum();
  unTC: Enum = new Enum();

  registrar(){

    /*this.unRol.idRol = 3;
    if(!this.formRegistro.value['checked']){
      this.unTC.idTipoDoc = 1
    } else {
      this.unTC.idTipoDoc = 2
    }    
    this.unUsuario.Status = true;
    this.unUsuario.idRol = this.unRol;*/
    this.unProducto.descripcionProduct = this.formRegistro.value['descripcion'];
    this.unProducto.nombreProduct= this.formRegistro.value['nombre'];
    this.unProducto.precioUni= this.formRegistro.value['precioU'];
    this.unProducto.precioDescuProduct= this.formRegistro.value['precioD'];
    this.unProducto.imagen= this.formRegistro.value['imagen'];
    this.unProducto.idCateg= this.formRegistro.value['idcategoria'];
    this.unProducto.idMarca= this.formRegistro.value['idmarca'];
    this.unProducto.idTipoProduc= this.formRegistro.value['idtipoproducto'];
    this.unProducto.idEtiqueta= this.formRegistro.value['idetiqueta'];
    this.unProducto.stockProduct= this.formRegistro.value['cantidad'];
    this.unProducto.tallaProduct= this.formRegistro.value['talla'];
    this.unProducto.colorProduct= this.formRegistro.value['color'];
   /* this.unCliente.idTipoDoc=this.unTC;
    this.unCliente.idUserCliente = this.unUsuario;*/
    /*if(this.selectedDepartmentCode != undefined){
      this.unCliente.ubigueo= this.selectedDepartmentCode+this.selectedProvinceCode+this.selectedDistrictCode;
    }    */
    console.log("🔥 > CRUDComponent > unProducto:", this.unProducto)
    this.serviceProducto.registrar(this.unProducto, this.auth.getToken()).subscribe(
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
