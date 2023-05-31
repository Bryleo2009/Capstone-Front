import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Details01Component } from './_page/producto/details/details.component';
import { HomeComponent } from './_page/inicial/home/home.component';
import { StoreComponent } from './_page/producto/store/store.component';
import { SeguimientoComponent } from './_page/paqueteria/trazaProduct/seguimiento/seguimiento.component';
import { CarritoComponent } from './_page/paqueteria/carrito/carrito.component';
import { DialogComponent } from './_page/producto/store/dialog/dialog.component';
import { TrazaProductComponent } from './_page/paqueteria/trazaProduct/trazaProduct.component';
import { EntregaComponent } from './_page/paqueteria/trazaProduct/entrega/entrega.component';
import { PagoComponent } from './_page/paqueteria/trazaProduct/pago/pago.component';
import { DeseosComponent } from './_page/cliente/deseos/deseos.component';
import { PaqueteriaComponent } from './_page/paqueteria/paqueteria.component';
import { LoginComponent } from './_page/cliente/login/login.component';
import { SessionComponent } from './_page/cliente/login/session/session.component';
import { Error } from './_page/error/error';
import { RegistroComponent } from './_page/cliente/login/registro/registro.component';
import { MenuComponent } from './_page/cliente/menu/menu.component';

import { AuthGuard } from './_service/rutas/auth-guard.service';
import { CuentaComponent } from './_page/cliente/cuenta/cuenta.component';
import { DatosPersonalesComponent } from './_page/cliente/cuenta/datos-personales/datos-personales.component';
import { ConfiguracionComponent } from './_page/cliente/cuenta/configuracion/configuracion.component';
import { ComprasComponent } from './_page/cliente/cuenta/compras/compras.component';
import { ListadeseoComponent } from './_page/paqueteria/listadeseo/listadeseo.component';




const routes: Routes = [
  { path: 'cuenta', component: CuentaComponent, children: [
  { path: '', component: DatosPersonalesComponent},
  { path: 'configuracion', component: ConfiguracionComponent},
  { path: 'compras', component: ComprasComponent}
]
},
  { path : '' , component : HomeComponent},
  { path : 'login' , component : LoginComponent, children: [
    { path: '', component: SessionComponent},
    { path: 'registro', component: RegistroComponent}
  ]
  },
  { path : 'deseos' , component : DeseosComponent},
  { path: 'error/:type', component: Error },
  { path : 'store' , component : StoreComponent, children: [
      { path: 'open', component: DialogComponent}
    ]
  },
  { path: 'pedido', component: PaqueteriaComponent, children: [
    { path : '', component: CarritoComponent},
    { path : 'trazabilidad', component : TrazaProductComponent,
    canActivate: [AuthGuard],
    data: { expectedRoles: ['ADMIN', 'SOPORTE','CLIENTE'] },
    children: [
      { path: 'entrega', component: EntregaComponent},
      { path: 'payment', component: PagoComponent},
      { path: 'ok', component: SeguimientoComponent},
    ] },
  ]},
  { path: 'details' , component : Details01Component},
  { path: 'seguimiento', component: SeguimientoComponent},

  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard],
  data: { expectedRoles: ['ADMIN', 'SOPORTE','CLIENTE'] },},
  { path: 'Listadeseo', component: ListadeseoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
