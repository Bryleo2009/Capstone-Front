import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Cliente } from '@app/_model/cliente';
import { Enum, EnumInter } from '@app/_model/enum';
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
import { tallaColorFilter } from '@app/_model/filter/tallaColorFilter';
import { TallaColorService } from '@app/_service/modelos/tallacolorservice';
import { TallaService } from '@app/_service/modelos/talla.service';
import { ColorService } from '@app/_service/modelos/color.service';
import { CategoriasService } from '@app/_service/modelos/categorias.service';
import { MenuItem } from 'primeng/api';

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
    private serviceProducto: ProductoService,//para la tabla de talla color solo es ejemplo
    private serviceTCF: TallaColorService,//para la tabla de talla color solo es ejemplo
    private auth: AuthService,
    private router: Router,
    private tallaService: TallaService,
    private colorService: ColorService,
    private categoriaService: CategoriasService

  ) {}

  formRegistro!: FormGroup;

  talla!: Enum[];
  products!: Producto[];//para la tabla de talla color
  color!: Enum[];
  selectedtalla!: Enum;
  selectedcolor!: Enum;
  seleccion!: string;
  categorias!: Enum[];
  categoriaActual!: string;
  items!: MenuItem[];
  selectedCategories!: Enum;
  /*TCF: tallaColorFilter[] = [];*/


  ngOnInit() {

    // llama a la función para asegurarte de que los valores iniciales se muestren en el chip
    this.updateValuestalla();
    this.updateValuescolor();
//para la tabla de talla color
  /*  this.serviceProducto.().then((data) => {
      this.products = data;
  });*/

/***************************************************/
/*this.serviceTCF.listar(almacen.getToken()).subscribe{

  (data) => {
    this.TCF = data;
    this.formRegistro.get('TCF')?.patchValue(this.TCF[0]);
  }

};
*/ 

 //listar categorias
 this.categoriaService.listar(this.auth.getToken()).subscribe((data) => {
  this.categorias = data;
  this.items = this.categorias.map((categoria) => {
    return {
      label: categoria.nombreItem,
      icon: categoria.abreviItem,
      command: () => {
        this.seleccion = categoria.abreviItem;
        this.categoriaActual = categoria.vistaItem;
       // this.filtrar(this.seleccion);
      },
    };
  });
});



//listar tallas
  this.tallaService.listar(this.auth.getToken()).subscribe((data) => {
   this.talla = data.filter((talla) => talla.vistaItem !== 'Talla unica');
  });

   //listar colores
  this.colorService.listar(this.auth.getToken()).subscribe((data) => {
    this.color = data.filter((color) => color.vistaItem !== 'Color unico');
   });

    this.formRegistro = new FormGroup({
      descripcionProduct: new FormControl({
        value: '',
        disabled: false,
      }),
      nombreProduct: new FormControl({
        value: '',
        disabled: false,
      }),
      precioUni: new FormControl({
        value: '',
        disabled: false,
      }),
      precioDescuProduct: new FormControl({
        value: '',
        disabled: false,
      }),
      imagen: new FormControl({
        value: '',
        disabled: false,
      }),
      idCateg: new FormControl({
        value: '',
        disabled: false,
      }),
      idMarca: new FormControl({
        value: '',
        disabled: false,
      }),
      idTipoProduc: new FormControl({
        value: '',
        disabled: false,
      }),
      idEtiqueta: new FormControl({
        value: '',
        disabled: false,
      }),
      idTalla: new FormControl({
        value: '',
        disabled: false,
      }),
      idColor: new FormControl({
        value: '',
        disabled: false,
     }),
     idCantidad: new FormControl({
      value: '',
      disabled: false,
    }),
    });
  }





  valuestalla: any[] = [];
  abreviaturastalla: any[] = [];
  updateValuestalla() {
    if (this.selectedtalla) {
      const newItem = this.selectedtalla.vistaItem;
      if (!this.valuestalla.includes(newItem)) {
        this.valuestalla.push(newItem);
        this.abreviaturastalla.push(this.selectedtalla.abreviItem);
        //this.filtrar(this.seleccion);
      }
    }
  }

  //etiqwuetas de filtrado
  removetalla(talla: string) {
    const index = this.valuestalla.indexOf(talla);
    if (index !== -1) {
      this.valuestalla.splice(index, 1);
      this.abreviaturastalla.splice(index, 1);
      //this.filtrar(this.seleccion);
    }
  }

  valuescolor: any[] = [];
  abreviaturascolor: any[] = [];
  updateValuescolor() {
    if (this.selectedcolor) {
      const newItem = this.selectedcolor.vistaItem;
      if (!this.valuescolor.includes(newItem)) {
        this.valuescolor.push(newItem);
        this.abreviaturascolor.push(this.selectedcolor.abreviItem);
        //this.filtrar(this.seleccion);
      }
    }
  }

  //etiqwuetas de filtrado
  removecolor(color: string) {
    const index = this.valuestalla.indexOf(color);
    if (index !== -1) {
      this.valuescolor.splice(index, 1);
      this.abreviaturascolor.splice(index, 1);
      //this.filtrar(this.seleccion);
    }
  }


  valuescategoria: any[] = [];
  abreviaturascategoria: any[] = [];
  updateValuescategoria() {
    
    if (this.selectedCategories) {
      const newItem = this.selectedCategories;
      if (!this.valuescategoria.includes(newItem)) {
        this.valuescategoria.push(newItem);
        this.abreviaturascategoria.push(this.selectedCategories);
      }
    }
  }

  //etiqwuetas de filtrado
  removecategoria(categoria: string) {
    const index = this.valuestalla.indexOf(categoria);
    if (index !== -1) {
      this.valuescategoria.splice(index, 1);
      this.abreviaturascategoria.splice(index, 1);
      //this.filtrar(this.seleccion);
    }
  }


  @Input() flexWrap: boolean = false;

  unProducto: Producto = new Producto();
  unTallaColor: tallaColorFilter = new tallaColorFilter();
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
    this.unTallaColor.talla = this.formRegistro.value['idTalla'];
    this.unTallaColor.color = this.formRegistro.value['idColor'];
    this.unTallaColor.cantidad = this.formRegistro.value['idCantidad'];
    //seteando unProducto a unRegistro

    this.unRegistro.producto	 =  this.unProducto;

    console.log(this.unProducto,this.unProducto)
    /*this.serviceProducto.registrar(this.unRegistro, this.auth.getToken()).subscribe(
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
    );*/
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
