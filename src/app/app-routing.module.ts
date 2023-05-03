import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Details01Component } from './_page/details/details.component';
import { HomeComponent } from './_page/home/home.component';
import { StoreComponent } from './_page/store/store.component';
import { PedidoshComponent } from './_page/pedidosh/pedidosh.component';
import { SeguimientoComponent } from './_page/seguimiento/seguimiento.component';
import { CarritoComponent } from './_page/carrito/carrito.component';


const routes: Routes = [
  { path : '' , component : HomeComponent},
  { path : 'store' , component : StoreComponent},
  { path : 'details' , component : Details01Component},
  { path : 'pedido', component : PedidoshComponent},
  { path : 'seguimiento', component: SeguimientoComponent},
  { path : 'carrito' , component : CarritoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
