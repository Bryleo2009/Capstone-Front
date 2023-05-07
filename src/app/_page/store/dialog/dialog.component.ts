import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '@app/_model/producto';
import { ProductoService } from '@app/_service/modelos/producto.service';
import { EncryptionService } from '@app/_service/util/encryption.service';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

  constructor(
    private router: Router,
    private encryp: EncryptionService,
    private route: ActivatedRoute,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private productoService: ProductoService
  ){}

  cant= 1;
  producto!: Producto;
  ngOnInit(): void {
    this.productoService.listarPorId(this.config.data.id,'token').subscribe(
      (data) => {
        this.producto = data;
      }
    );
  }

  cerrarModal(){
    this.ref.close(this.ref);
  }

}
