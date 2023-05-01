import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '@app/_model/producto';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { EncryptionService } from '@app/_service/util/encryption.service';

interface Car {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  priced?: number;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class Details01Component {

  constructor(
    private route: ActivatedRoute,
    private encryp: EncryptionService,
    private router: Router,
    private producSerive: ProductoService,

    ) { } 

  id!: string;
  estado: string = '';
  producto:Producto = new Producto();
  estrellas = 3;
  cant = 1;
  ngOnInit() {
    //si estoy visualizando
    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.estado = params['estado'];
    });

    if (this.id !== null && this.id !== undefined && this.id !== '') {
      this.producSerive
        .listarPorId(Number(this.encryp.decrypt(this.id)), 'token')
        .subscribe((unproducto: Producto) => {
          this.producto = unproducto;
          console.log("🔥 > Details01Component > .subscribe > producto:", this.producto)
        });
    }

    this.cars = [
      {
        id: '1',
        name: 'Chompa 1',
        description: 'Chompa Prueba N°1',
        price: 150,
        priced: 95,
      },
      {
        id: '2',
        name: 'Chompa 2',
        description: 'Chompa Prueba N°5',
        price: 160,
        priced: 100,
      },
      {
        id: '3',
        name: 'Chompa 3',
        description: 'Chompa Prueba N°3',
        price: 170,
        priced: 105,
      },
    ];
  }

  cars: Car[] = [];
 
}
