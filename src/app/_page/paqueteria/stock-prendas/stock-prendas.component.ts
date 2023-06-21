import { Component, OnInit } from '@angular/core';
import { Producto } from '@app/_model/producto';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-stock-prendas',
  templateUrl: './stock-prendas.component.html',
  styleUrls: ['./stock-prendas.component.css']
})
export class StockPrendasComponent {
  // products: Producto[];
  // constructor(private productService: ProductoService) {}

  // ngOnInit() {
  //     this.productService.getProductsMini().then((data) => {
  //         this.products = data;
  //     });
  // }
}


