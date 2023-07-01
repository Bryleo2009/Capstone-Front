import { Component, OnInit } from '@angular/core';
import { Producto } from '@app/_model/producto';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { AuthService } from '@app/_service/rutas/auth.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-stock-prendas',
  templateUrl: './stock-prendas.component.html',
  styleUrls: ['./stock-prendas.component.css']
})
export class StockPrendasComponent implements OnInit {

  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

  constructor(
    private serviceProducto: ProductoService,
    private almacen: AuthService,
  ){}

  ngOnInit(): void {
    this.serviceProducto.colorTalla('1',this.almacen.getToken()).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }


}


