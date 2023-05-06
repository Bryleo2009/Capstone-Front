import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { EncryptionService } from '@app/_service/util/encryption.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(
    private categoriaService: CategoriasService,
    private productoService: ProductoService,
    private tallaService: TallaService,
    private marcaService: MarcaService,
    private etiquetaService: EtiquetaService,
    private router: Router,
    private encryp: EncryptionService,
    private route: ActivatedRoute,
  ){}
 
  responsiveOptions: any[] = [];
  
  ngOnInit(): void {
   
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
    //listar productos
    this.listarProductosCaballeros();
    this.listarProductosDamas();
  }




  productosCaballeros!:ProductoFilter[];
  listarProductosCaballeros(): void {
    this.productoService.listar('CAB',[],[],[],[],[],0,999,20,0,'token').subscribe(
      (data) => {
        this.productosCaballeros = data.content;
      }
    );
  }


  productosDamas!:ProductoFilter[];
  listarProductosDamas(): void {
  this.productoService.listar('DAM',[],[],[],[],[],0,999,20,0,'token').subscribe(
    (data) => {
      this.productosDamas = data.content;
    }
  );
  }


  navegar(categoria: string){
    console.log(categoria);
    this.router.navigate(['/store'] , {
      relativeTo: this.route,
      queryParams: { categoria: this.encryp.encrypt(String(categoria)), estado: '_?' },
      fragment: 'filtrado'
    });
  }



     //encriptamiento de ruta de visualizacion
     visualizar(id: number) {
      this.router.navigate(['/details'], {
        relativeTo: this.route,
        queryParams: { id: this.encryp.encrypt(String(id)), estado: '_?' },
      });
    }

}
