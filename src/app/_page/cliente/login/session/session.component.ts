import { ViewportScroller } from '@angular/common';
import { Login } from './../../../../_model/login';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/_service/rutas/auth.service';
import { EncryptionService } from '@app/_service/util/encryption.service';
import { LoginService } from '@app/_service/util/login.service';
import { AppComponent } from '@app/app.component';
import { GoogleAuthProvider } from 'firebase/auth';
import { EntregaComponent } from '@app/_page/paqueteria/trazaProduct/entrega/entrega.component';
import { DataService } from '@app/_service/modelos/data.service';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit{
  
  constructor(
    private afAuth: AngularFireAuth,
    private login: LoginService,
    private principal: AppComponent,
    private almacen: AuthService,
    private router: Router,
    private encryp: EncryptionService,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private entregaComponente: EntregaComponent,
    private dataService: DataService,
    private httpClient: HttpClient,
  ){}
  
  checked!: boolean;
  formLogin!: FormGroup;
  ngOnInit(): void {
    this.dataService.updateVariable(false);
    this.formLogin = new FormGroup({
      password: new FormControl({
        value: '',
        disabled: false,
      }),
      email: new FormControl({
        value: '',
        disabled: false,
      }),
      checked: new FormControl({
        value: false,
        disable: false
      })
    });
  }


  //iniciio sesion google
  signInWithGoogle(): void {
    this.afAuth.signInWithPopup(new GoogleAuthProvider())
      .then((result) => {
        // Autenticación exitosa
      // Puedes obtener el token de acceso del usuario desde 'result.credential.accessToken'
      const credential = result.credential;
      if (credential) {
        const credential = result.credential;
        if (credential && 'accessToken' in credential) {
          const accessToken = credential['accessToken'];
          // Realizar una solicitud a la API de Google para obtener la información adicional del usuario
          const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;
          this.httpClient.get(url)
            .subscribe((userInfo: any) => {
              // Obtener el nombre y el apellido del objeto userInfo
              const firstName = userInfo.given_name;
              const lastName = userInfo.family_name;
              console.log("🔥 > Por google > signInWithGoogle:", firstName + " / " + lastName);
            });
        } else {
          console.log("🔥 > Por google > signInWithGoogle: No se pudo obtener el token de acceso.");
        }
      } else {
        console.log("🔥 > Por google > signInWithGoogle: No se pudo obtener las credenciales de autenticación.");
      }
      })
      .catch((error) => {
        // Manejo de errores
        this.principal.mensaje('error','Error de inicio de sesion',error);
      });
  }

  // signInWithFacebook() {
  //   this.afAuth.signInWithPopup(new FacebookAuthProvider())
  //     .then((result) => {
  //       // El usuario se ha autenticado correctamente con Facebook
  //       // Puedes acceder a los datos del usuario utilizando result.user
  //       console.log(result.user)
  //     })
  //     .catch((error) => {
  //       console.log('Error al iniciar sesión con Facebook:', error);
  //     });
  // }

  unUsuario: Login = new Login();
  verificar(){    
    this.unUsuario.password = this.formLogin.value['password'];
    this.unUsuario.username = this.formLogin.value['email'];
    console.log("🔥 > Por base de datos > usuario:", this.unUsuario.username + " / " + this.unUsuario.password)
    this.login.ingresar(this.unUsuario).subscribe(
      async (data) => {
          const token = (data as { token: string }).token;
          this.almacen.setToken(token);
          this.dataService.updateVariable(true);
        if(this.router.url === '/pedido/trazabilidad/entrega'){
          //cambia la variable de mi padre entrega, para mostrar el formulario de direcion de entrega
          // this.actualizarflujoEnPadre(true);
        } else {
          const encryptedId = this.encryp.encrypt(String(this.unUsuario.username));
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router
              .navigate(['/menu'], {
                relativeTo: this.route,
                queryParams: { id: encryptedId, estado: '_?' },
              })
              .then(() => {
                this.viewportScroller.scrollToPosition([0, 0]); // Scroll hacia arriba
              });
          });
        }

        },
      (error) => {
      this.principal.mensaje('error','Error de inicio de sesion',error.error.mensaje);
    });
  }
}
