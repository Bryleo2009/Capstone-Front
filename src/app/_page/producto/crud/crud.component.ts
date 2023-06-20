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
import { Categoria } from '@app/_model/categoria';
import { TipoProductoService } from '@app/_service/modelos/tipo-producto.service';
import { TipoProducto } from '@app/_model/tipoProducto';
import { EtiquetaService } from '@app/_service/modelos/etiqueta.service';
import { Etiqueta } from '@app/_model/etiqueta';
import { MarcaService } from '@app/_service/modelos/marca.service';
import { Marca } from '@app/_model/marca';
import { Talla } from '@app/_model/talla';
import { Color } from '@app/_model/color';

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
    private auth: AuthService,
    private router: Router,
    private almacen: AuthService,
    private tallaService: TallaService,
    private categoriaService: CategoriasService,
    private tipoprodService: TipoProductoService,
    private etiquetaService: EtiquetaService,
    private marcaService: MarcaService,
    private colorService: ColorService

  ) {}

  formRegistro!: FormGroup;
  products!: Producto[];//para la tabla de talla color
  seleccion!: string;
  categorias: Categoria[] = [];
  items!: MenuItem[];
  selectedCategories!: Enum;
  tipoprods: TipoProducto[] = [];
  etiquetas: Etiqueta[] = [];
  marcas: Marca[] = [];
  selectedEtiqueta!: Enum;
  tallas: Talla[] = [];
  colores: Color[] = [];
  TCFser: tallaColorFilter[] = [];
  /*TCF: tallaColorFilter[] = [];*/


  ngOnInit() {
    this.updateValuesEtiquetas();
    // llama a la función para asegurarte de que los valores iniciales se muestren en el chip
  /*  this.updateValuestalla();
    this.updateValuescolor();*/
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

  this.categoriaService.listar(this.almacen.getToken()).subscribe(

    (data) => {
      this.categorias = data;
      this.formRegistro.get('categorias')?.patchValue(this.categorias[0].idCateg);
    }
  );

  this.tipoprodService.listar(this.almacen.getToken()).subscribe(

    (data) => {
      this.tipoprods = data;
      this.formRegistro.get('tipoprods')?.patchValue(this.tipoprods[0].idTipoProduc);
    }
  );

  this.etiquetaService.listar(this.auth.getToken()).subscribe((data) => {
    this.etiquetas = data;
  });

  this.marcaService.listar(this.almacen.getToken()).subscribe(

    (data) => {
      this.marcas = data;
      this.formRegistro.get('marcas')?.patchValue(this.marcas[0].idMarca);
    }
  );

  this.tallaService.listar(this.almacen.getToken()).subscribe(

    (data) => {
      this.tallas = data;
      this.formRegistro.get('tallas')?.patchValue(this.tallas[0].nombreItem);
    }
  );

  this.colorService.listar(this.almacen.getToken()).subscribe(

    (data) => {
      this.colores = data;
      this.formRegistro.get('colores')?.patchValue(this.colores[0].idColor);
    }
  );


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


  valuesEtiqueta: any[] = [];
  abreviaturasEtiqueta: any[] = [];
  updateValuesEtiquetas() {
    if (this.selectedEtiqueta) {
      const newItem = this.selectedEtiqueta.vistaItem;
      if (!this.valuesEtiqueta.includes(newItem)) {
        this.valuesEtiqueta.push(newItem);
        this.abreviaturasEtiqueta.push(this.selectedEtiqueta.abreviItem);
        console.log(this.valuesEtiqueta);
      //  this.filtrar(this.seleccion);
      }
    }
  }

  //etiqwuetas de filtrado
  removeEtiqueta(etiqueta: string) {
    const index = this.valuesEtiqueta.indexOf(etiqueta);
    if (index !== -1) {
      this.valuesEtiqueta.splice(index, 1);
      this.abreviaturasEtiqueta.splice(index, 1);
     // this.filtrar(this.seleccion);
    }
  }


  @Input() flexWrap: boolean = false;

  unProducto: Producto = new Producto();
  unRegistro: RegistroProductFilter = new RegistroProductFilter ();
  unTallaColor: tallaColorFilter = new tallaColorFilter();

  registrar(){

    console.log(this.formRegistro);

    this.unProducto.descripcionProduct = this.formRegistro.value['descripcionProduct'];
    this.unProducto.nombreProduct= this.formRegistro.value['nombreProduct'];
    this.unProducto.precioUni= this.formRegistro.value['precioUni'];
    this.unProducto.precioDescuProduct= this.formRegistro.value['precioDescuProduct'];
    this.unProducto.imagen= this.formRegistro.value['imagen'];
    this.unProducto.idCateg= this.formRegistro.value['idCateg'];
    this.unProducto.idTipoProduc= this.formRegistro.value['idTipoProduc'];
    this.unProducto.idEtiqueta= this.formRegistro.value['idEtiqueta'];
    this.unProducto.idMarca= this.formRegistro.value['idMarca'];
    this.TCFser.push({
      talla: this.formRegistro.value['idTalla'],
      color: this.formRegistro.value['idColor'],
      cantidad: this.formRegistro.value['idCantidad']
    });

    //seteando unProducto a unRegistro
    
    /*this.unRegistro.producto	 =  this.unProducto;
    this.unRegistro.tallaColorFilters	 =  this.unTallaColor;*/



    this.unRegistro.producto	 =  this.unProducto;
    this.unRegistro.tallaColorFilters	 =  this.TCFser;


    console.log(this.TCFser)

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
