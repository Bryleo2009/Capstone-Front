import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductoFilter } from '@app/_model/filter/productoFilter';
import { Producto } from '@app/_model/producto';
import { CategoriasService } from '@app/_service/modelos/categorias.service';
import { EtiquetaService } from '@app/_service/modelos/etiqueta.service';
import { MarcaService } from '@app/_service/modelos/marca.service';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { TallaService } from '@app/_service/modelos/talla.service';
import { ColorService } from '@app/_service/modelos/color.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from '@app/_service/util/encryption.service';
import { ProductoStorage } from '@app/_model/filter/productoStorage';
import { Observable, forkJoin } from 'rxjs';
import { PaqueteriaComponent } from '../paqueteria.component';
import { Enum, EnumInter } from '@app/_model/enum';
import { TipoProductoService } from '@app/_service/modelos/tipo-producto.service';
import { AuthService } from '@app/_service/rutas/auth.service';
import { ListaDeseoFilter } from '@app/_model/filter/listadeseoFilter';
import { ListaDeseoService } from '@app/_service/modelos/listadeseo.service';

@Component({
  selector: 'app-listadeseo',
  templateUrl: './listadeseo.component.html',
  styleUrls: ['./listadeseo.component.css'],
})
export class ListadeseoComponent {
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
    private productoNormService: ProductoService,
    private listadeseo: ListaDeseoService,
    private changeDetectorRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private pequeteriaComponent: PaqueteriaComponent,
    private tipoProductoService: TipoProductoService,
    private auth: AuthService
  ) {
    this.monto = 0;
  }

  cant = 1;
  listadeseoLocalStorage: ProductoStorage[] = [];
  products: ProductoFilter[] = [];
  monto: number;
  ngOnInit(): void {
    
    this.listadeseoLocalStorage = this.listadeseo.obtenerProductosListadeseo();
    
    if(this.listadeseoLocalStorage.length === 0){
      this.actualizarMontoEnPadre(0,0,0);
      this.actualizarCantidadEnPadre(0);
    }
    const requests: Observable<Producto>[] = [];
    for (const producto of this.listadeseoLocalStorage) {
      const request = this.productoNormService.listarPorId(
        producto.idProduct.toString(),
        this.auth.getToken()
      );
      requests.push(request);
    }

    /*forkJoin(requests).subscribe((data: Producto[]) => {
      this.products = data.map((producto, index) => {
        const listadeseoItem = this.listadeseoLocalStorage[index];
        const productoFilter: ProductoFilter = {
          id_product: producto.idProduct,
          iup: producto.iup,
          nombre_product: producto.nombreProduct,
          imagen: producto.imagen,
          precio_uni: producto.precioUni,
          is_precio_desc_product: producto.isPrecioDescProduct,
          precio_descu_product: producto.precioDescuProduct,
          etiquetas: '',
          tallas: new Enum(), // Actualizar con los datos de la talla correspondiente
          cantidad: listadeseoItem.cantProduct,
          marca: producto.idMarca.vistaItem,
          colores: new Enum(), // Actualizar con los datos del color correspondiente
          tipoProduct: '', // Actualizar con los datos del tipo de producto correspondiente
        };
    
        // Obtener datos de la talla
        this.tallaService.listarPorId(listadeseoItem.tallaid.toString(), this.auth.getToken()).subscribe((talla) => {
          productoFilter.tallas = talla;
          console.log("🔥 > ListadeseoComponent > this.tallaService.listarPorId > talla:", talla)
        });
    
        // Obtener datos del color
        this.colorService.listarPorId(listadeseoItem.colorid.toString(), this.auth.getToken()).subscribe((color) => {
          productoFilter.colores = color;
          console.log("🔥 > ListadeseoComponent > this.colorService.listarPorId > color:", color)
        });
    
        // Obtener datos del tipo de producto
        this.tipoProductoService.listarPorId(producto.idTipoProduc.idTipoProduc.toString(), this.auth.getToken()).subscribe((tipoProducto) => {
          productoFilter.tipoProduct = tipoProducto.vistaItem;
        });
        console.log("🔥 > ListadeseoComponent > this.products=data.map > productoFilter:", productoFilter)
    
        return productoFilter;
      });
      this.calcMonto(this.products);
    });
    */

    
  }


  actualizarMontoEnPadre(monto:number,igv:number, amount:number) {
    this.pequeteriaComponent.actualizarMontoDesdeHijo(monto, igv, amount);
  }

  actualizarCantidadEnPadre(cantidad:number) {
    this.pequeteriaComponent.actualizarCantidadDesdeHijo(cantidad);
  }
  


  confirm(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target ?? undefined,
      acceptLabel: 'No',
      rejectLabel: 'Si',
      message: '¿Desea eliminar el producto?',
      icon: 'pi pi-exclamation-triangle',
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Registro eliminado',
          detail: 'El producto ha sido eliminado de la lista de deseo',
        });
        this.eliminarProducto(id);
      },
    });
  }

  eliminarProducto(id: number) {
    // Eliminar el producto del localStorage
    const listaProductosString = localStorage.getItem('listadeseo');
    if (listaProductosString !== null) {
      const listaProductos: ProductoStorage[] =
        JSON.parse(listaProductosString);
      const index = listaProductos.findIndex(
        (producto) => producto.idProduct === id
      );
      if (index !== -1) {
        listaProductos.splice(index, 1);
        localStorage.setItem('listadeseo', JSON.stringify(listaProductos));
      }
    }

    // Actualizar la lista de productos en el componente
    this.listadeseoLocalStorage = this.listadeseo.obtenerProductosListadeseo();
    // Recargar vista
    location.reload();
  }

  
  calcMonto(listProductos: ProductoFilter[] = []) {
    let valor: number = 0;
    let productos: number = 0;
    for(var i=0; i<listProductos.length; i++){
      productos = productos + listProductos[i].cantidad;
      if(listProductos[i].is_precio_desc_product){
        valor =  valor + (listProductos[i].precio_descu_product * listProductos[i].cantidad);
      } else {
        valor = valor + (listProductos[i].precio_uni * listProductos[i].cantidad);
      }
    }
    this.actualizarCantidadEnPadre(productos);
    this.actualizarMontoEnPadre(Number(valor.toFixed(2)), Number((valor * 0.18).toFixed(2)), Number((valor + Number((valor * 0.18).toFixed(2))).toFixed(2)));
  }
}

