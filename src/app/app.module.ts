import { Error } from './_page/error/error';
import { RouterModule } from '@angular/router';
import { NgImageSliderModule } from 'ng-image-slider';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PrimeNGModule } from './prime-ng.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Details01Component } from './_page/producto/details/details.component';
import { HeaderComponent } from './_page/inicial/header/header.component';
import { StoreComponent } from './_page/producto/store/store.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './_page/inicial/footer/footer.component';
import { HomeComponent } from './_page/inicial/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { SessionStorageService } from 'ngx-webstorage';
import { AuthService } from './_service/rutas/auth.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AuthGuard } from './_service/rutas/auth-guard.service';
import { RegistroComponent } from './_page/cliente/login/registro/registro.component';
import { environment } from '@env/environment.development';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { MenuComponent } from './_page/cliente/menu/menu.component';
import { CuentaComponent } from './_page/cliente/cuenta/cuenta.component';
import { DatosPersonalesComponent } from './_page/cliente/cuenta/datos-personales/datos-personales.component';
import { ConfiguracionComponent } from './_page/cliente/cuenta/configuracion/configuracion.component';
import { ComprasComponent } from './_page/cliente/cuenta/compras/compras.component';
import { ListadeseoComponent } from './_page/paqueteria/listadeseo/listadeseo.component';
import { ChatbotComponent } from './_page/inicial/chatbot/chatbot.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    Details01Component,
    Error,
    HeaderComponent,
    StoreComponent,
    FooterComponent,
    HomeComponent,
    SeguimientoComponent,
    CarritoComponent,
    DialogComponent,
    ChatbotComponent,
    TrazaProductComponent,
    EntregaComponent,
    PagoComponent,
    DeseosComponent,
    PaqueteriaComponent,
    LoginComponent,
    SessionComponent,
    RegistroComponent,
    MenuComponent,
    CuentaComponent,
    DatosPersonalesComponent,
    ConfiguracionComponent,
    ComprasComponent,
    ListadeseoComponent
  ],
  imports: [
    RouterModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    PrimeNGModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    NgImageSliderModule,
    BrowserAnimationsModule,
    NgxWebstorageModule.forRoot(),
  ],exports: [
    PrimeNGModule,
  ],
  providers: [
    AppComponent,PaqueteriaComponent,AuthGuard,EntregaComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
