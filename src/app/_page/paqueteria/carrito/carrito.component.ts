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
import { ColorService } from '@app/_service/modelos/color.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { EncryptionService } from '@app/_service/util/encryption.service';
import { ProductoStorage } from '@app/_model/filter/productoStorage';
import { CarritoService } from '@app/_service/modelos/carrito.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
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
    private productoNormService: ProductoService,
    private carrito: CarritoService,
    private changeDetectorRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  cant = 1;
  carritoLocalStorage: ProductoStorage[] = [];
  products: ProductoFilter[] = [];
  ngOnInit(): void {
    this.carritoLocalStorage = this.carrito.obtenerProductosCarrito();
    const requests: Observable<Producto>[] = [];
    for (const producto of this.carritoLocalStorage) {
      const request = this.productoNormService.listarPorId(
        producto.idProduct.toString(),
        'token'
      );
      requests.push(request);
    }

    forkJoin(requests).subscribe((data: Producto[]) => {
      this.products = data.map((producto, index) => {
        const productoFilter: ProductoFilter = {
          id_product: producto.idProduct,
          iup: producto.iup,
          nombre_product: producto.nombreProduct,
          imagen: producto.imagen,
          precio_uni: producto.precioUni,
          is_precio_desc_product: producto.isPrecioDescProduct,
          precio_descu_product: producto.precioDescuProduct,
          etiquetas: '',
          tallas: '',
          cantidad: this.carritoLocalStorage[index].cantProduct,
          marca: producto.idMarca.vistaItem,
          colores: '',
          tipoProduct: '',
        };
        return productoFilter;
      });
    });
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
          detail: 'El producto ha sido eliminado del carrito',
        });
        this.eliminarProducto(id);
      },
    });
  }

  eliminarProducto(id: number) {
    // Eliminar el producto del localStorage
    const listaProductosString = localStorage.getItem('carrito');
    if (listaProductosString !== null) {
      const listaProductos: ProductoStorage[] =
        JSON.parse(listaProductosString);
      const index = listaProductos.findIndex(
        (producto) => producto.idProduct === id
      );
      if (index !== -1) {
        listaProductos.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(listaProductos));
      }
    }

    // Actualizar la lista de productos en el componente
    this.carritoLocalStorage = this.carrito.obtenerProductosCarrito();
    // Recargar vista
    location.reload();
  }

  
}
