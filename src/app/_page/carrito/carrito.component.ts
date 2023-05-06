import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Categoria } from '@app/_model/categoria';
import { Colors, Enum } from '@app/_model/enum';
import { ProductoFilter } from '@app/_model/filter/productoFilter';
import { Producto } from '@app/_model/producto';
import { CategoriasService } from '@app/_service/modelos/categorias.service';
import { EtiquetaService } from '@app/_service/modelos/etiqueta.service';
import { MarcaService } from '@app/_service/modelos/marca.service';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { TallaService } from '@app/_service/modelos/talla.service';
import { TipoProductoService } from '@app/_service/modelos/tipo-producto.service';
import { ColorService } from '../../_service/modelos/color.service';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from '@app/_service/util/encryption.service';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  constructor(
    private categoriaService: CategoriasService,
    private productoService: ProductoService,
    private tallaService: TallaService,
    private marcaService: MarcaService,
    private etiquetaService: EtiquetaService,
    private colorService: ColorService,
    private router: Router,
    private encryp: EncryptionService,
    private route: ActivatedRoute,
  ) {
    this.seleccion = '';
    this.categoriaActual = "Todas las categorias"
  }
  rangeValues: number[] = [20, 80];
  selectedCategories: any[] = [];
  categories!: any[];
  selectedCategoriesTalla: any[] = [];
  selectedCategoriesColors: any[] = [];
  categoriesTalla!: any[];
  categoriaActual!: string;
  precioMin: number = 10;
  precioMax: number = 1000;
  categorias!: Enum[];
  colores!: Colors[];
  tallas!: Enum[];
  marcas!: Enum[];
  etiquetas!: Enum[];
  productos!: ProductoFilter[];
  totalRecords: number = 0;
  pageSize: number = 12;
  first: number = 0;
  rows: number = 12;
  selectedCountry!: Enum;
  items!: MenuItem[];
  seleccion!:string;
  cant = 1;
  ngOnInit(): void {   
      

    this.updateValues(); // llama a la función para asegurarte de que los valores iniciales se muestren en el chip

    console.log("🔥 > StoreComponent > this.items=Object.values > this.items:", this.items)
    //listar tallas
    this.tallaService.listar('token').subscribe((data) => {
      this.categoriesTalla = data.filter(color => color.vistaItem !== 'Talla unica');
    });

    //listar marcas
    this.marcaService.listar('token').subscribe((data) => {
      this.categories = data;
    });

    //listar etiquetas
    this.etiquetaService.listar('token').subscribe((data) => {
      this.etiquetas = data;
    });

    //listar colores
    this.colorService.getColor('token').subscribe((data) => {
      this.colores = data.filter(color => color.vista_item !== '');
    });

    //listar categorias
    this.categoriaService.listar('token').subscribe((data) => {
      this.categorias = data;
      this.items  = this.categorias.map(categoria => {
        return {
          label: categoria.nombreItem,
          icon: categoria.abreviItem,
          command: () => {            
            this.seleccion=categoria.abreviItem;
            this.categoriaActual=categoria.vistaItem;
            this.filtrar(this.seleccion);
          }
        };
      });
    });

    this.filtrar(this.seleccion);
  }

  listarProductos(categoria:string): void {
    this.productoService
      .listar(
        categoria,
        [],
        this.abreviaturas,
        this.selectedCategoriesTalla,
        this.selectedCategories,
        this.selectedCategoriesColors,
        this.precioMin,
        this.precioMax,
        this.pageSize,
        this.first / this.pageSize,
        'token'
      )
      .subscribe(
        (response) => {
          this.productos = response.content;
          this.totalRecords = response.totalElements;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  onPageChange(event: { first: number; rows: number }) {
    this.first = event.first;
    this.pageSize = event.rows;
    console.log(this.seleccion)
    this.filtrar(this.seleccion);
  }

  filtrar(categoria:string) {
    this.listarProductos(categoria);
  }

  values: any[] = [];
  abreviaturas: any[] = [];
  updateValues() {
    if (this.selectedCountry) {
      const newItem = this.selectedCountry.vistaItem;
      if (!this.values.includes(newItem)) {
        this.values.push(newItem);
        this.abreviaturas.push(this.selectedCountry.abreviItem);
        this.filtrar(this.seleccion);
      }
    }
  }

  //etiqwuetas de filtrado
  removeEtiqueta(etiqueta: string) {
    const index = this.values.indexOf(etiqueta);
    if (index !== -1) {
      this.values.splice(index, 1);
      this.abreviaturas.splice(index, 1);
      this.filtrar(this.seleccion);
    }
  }

   //encriptamiento de ruta de visualizacion
   visualizar(id: number) {
    this.router.navigate(['/details'], {
      relativeTo: this.route,
      queryParams: { id: this.encryp.encrypt(String(id)), estado: '_?' },
    });
  }


}
