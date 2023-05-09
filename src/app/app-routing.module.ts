import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Details01Component } from './_page/producto/details/details.component';
import { HomeComponent } from './_page/inicial/home/home.component';
import { StoreComponent } from './_page/producto/store/store.component';
import { PedidoshComponent } from './_page/paqueteria/pedidosh/pedidosh.component';
import { SeguimientoComponent } from './_page/paqueteria/seguimiento/seguimiento.component';
import { CarritoComponent } from './_page/paqueteria/carrito/carrito.component';
import { DialogComponent } from './_page/producto/store/dialog/dialog.component';
import { TrazaProductComponent } from './_page/paqueteria/trazaProduct/trazaProduct.component';
import { EntregaComponent } from './_page/paqueteria/trazaProduct/entrega/entrega.component';
import { PagoComponent } from './_page/paqueteria/trazaProduct/pago/pago.component';
import { DeseosComponent } from './_page/deseos/deseos.component';


const routes: Routes = [
  { path : '' , component : HomeComponent},
  { path : 'deseos' , component : DeseosComponent},
  { path : 'store' , component : StoreComponent, children: [
      { path: 'open', component: DialogComponent}
    ]
  },
  { path: 'pedido', component: CarritoComponent},
  { path : 'details' , component : Details01Component},
  { path : 'trazabilidad', component : TrazaProductComponent, children: [
    { path: 'entrega', component: EntregaComponent},
    { path: 'payment', component: PagoComponent},
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
