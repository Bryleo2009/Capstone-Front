import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Cliente } from '@app/_model/cliente';
import { Enum } from '@app/_model/enum';
import { Rol } from '@app/_model/rol';
import { Departamento } from '@app/_model/ubigeo/departamento';
import { Distrito } from '@app/_model/ubigeo/distrito';
import { Provincia } from '@app/_model/ubigeo/privincia';
import { Usuario } from '@app/_model/usuario';
import { ClienteService } from '@app/_service/modelos/cliente.service';
import { AuthService } from '@app/_service/rutas/auth.service';
import { AppComponent } from '@app/app.component';
import { environment } from '@env/environment.development';
import { GoogleAuthProvider } from 'firebase/auth';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  date: Date = new Date();
  checked!: boolean;
  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private principal: AppComponent,
    private serviceCliente: ClienteService,
    private auth: AuthService,
    private router: Router
  ) {}
  formRegistro!: FormGroup;
  porCorreo: boolean = false;
  porGoogle:  boolean = false;
  ngOnInit() {
    //cargar JSOn de ubigeo
    this.http.get<Departamento[]>('./assets/ubigeo.json').subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.log('Error al cargar el archivo JSON:', error);
      }
    );

    this.formRegistro = new FormGroup({
      departamentoPaciente: new FormControl({
        value: '',
        disabled: false,
      }),
      provinciaPaciente: new FormControl({
        value: '',
        disabled: false,
      }),
      distritoPaciente: new FormControl({
        value: '',
        disabled: false,
      }),
      checked: new FormControl({
        value: false,
        disabled: false,
      }),
      numDoc: new FormControl({
        value: '',
        disabled: false,
      }),
      nombre: new FormControl({
        value: '',
        disabled: false,
      }),
      apellidos: new FormControl({
        value: '',
        disabled: false,
      }),
      fechaNac: new FormControl({
        value: '',
        disabled: false,
      }),
      numCel: new FormControl({
        value: '',
        disabled: false,
      }),
      direccion: new FormControl({
        value: '',
        disabled: false,
      }),
      correo: new FormControl(
        {
          value: '',
          disabled: false,
        },
        [Validators.email]
      ),username: new FormControl(
        {
          value: '',
          disabled: false,
        }
      ),
      password: new FormControl(
        {
          value: '',
          disabled: false,
        }
      ),
    });
  }

  //cargar combos ubigeo
  selectedDepartment: Departamento | undefined;
  selectedDistrict: Distrito | undefined;
  selectedProvince: Provincia | undefined;
  selectedDepartmentCode: string | undefined;
  selectedProvinceCode: string | undefined;
  selectedDistrictCode: string | undefined;
  districts: any[] = [];
  provinces: any[] = [];
  anti_depart: string | undefined;
  dataJson = environment.dataJSON;
  departments: Departamento[] = [];
  updateDistrictsAndProvinces() {
    this.districts = [];
    this.provinces = [];
    this.selectedDepartment = this.departments.find(
      (department) =>
        department.nombre_departamento ===
        this.selectedDepartment?.nombre_departamento
    ) as Departamento;
    if (this.anti_depart != this.selectedDepartment?.nombre_departamento) {
      this.selectedDistrict = this.districts[-1];
      this.selectedProvince = this.provinces[-1];
      this.anti_depart = this.selectedDepartment?.nombre_departamento;
    }
    if (this.selectedDepartment && this.selectedDepartment.provincias) {
      this.provinces = this.selectedDepartment.provincias.filter((p) => p);
      this.selectedDepartmentCode = this.selectedDepartment.cod;
    }
    if (this.selectedProvince && this.selectedProvince.distritos) {
      this.districts = this.selectedProvince.distritos.filter((d) => d);
      this.selectedProvinceCode = this.selectedProvince.cod;
    }
    if (this.selectedDistrict) {
      this.selectedDistrictCode = this.selectedDistrict.cod;
      console.log(
        'ubigeo seleccionado: >',
        this.selectedDepartmentCode,
        this.selectedProvinceCode,
        this.selectedDistrictCode
      );
    }
  }

  @Input() flexWrap: boolean = false;

  signInWithGoogle(): void {
    this.afAuth
      .signInWithPopup(new GoogleAuthProvider())
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
            this.http.get(url).subscribe((userInfo: any) => {
              // Obtener el nombre y el apellido del objeto userInfo
              const firstName = userInfo.given_name;
              const lastName = userInfo.family_name;
              const email = userInfo.email;
              const profilePicture = userInfo.picture;
              this.porGoogle = true;
              
              this.verificarEmail(email,firstName,lastName);
            });
          } else {
            console.log(
              '🔥 > Por google > signInWithGoogle: No se pudo obtener el token de acceso.'
            );
          }
        } else {
          console.log(
            '🔥 > Por google > signInWithGoogle: No se pudo obtener las credenciales de autenticación.'
          );
        }
      })
      .catch((error) => {
        // Manejo de errores
        this.principal.mensaje('error', 'Error de inicio de sesion', error);
      });
  }


  verificarEmail(correo: string, firstName?: string,lastName?: string) {
    if (correo != '') {
      //verificar existrencia del correo
      this.serviceCliente.exitenciaXCorreo(correo,this.auth.getToken()).subscribe(
        (response) => {
          console.log("🔥 > RegistroComponent > verificarEmail > response:", response)

          if(response == true){
            this.principal.mensaje('warn','Ups!','Correo ya registrado en la base de datos');
          } else {
            this.porCorreo = true;
              this.formRegistro = new FormGroup({
                departamentoPaciente: new FormControl({
                  value: '',
                  disabled: false,
                }),
                provinciaPaciente: new FormControl({
                  value: '',
                  disabled: false,
                }),
                distritoPaciente: new FormControl({
                  value: '',
                  disabled: false,
                }),
                checked: new FormControl({
                  value: false,
                  disabled: false,
                }),
                numDoc: new FormControl({
                  value: '',
                  disabled: false,
                }),
                nombre: new FormControl({
                  value: firstName,
                  disabled: false,
                }),
                apellidos: new FormControl({
                  value: lastName,
                  disabled: false,
                }),
                fechaNac: new FormControl({
                  value: '',
                  disabled: false,
                }),
                numCel: new FormControl({
                  value: '',
                  disabled: false,
                }),
                direccion: new FormControl({
                  value: '',
                  disabled: false,
                }),
                correo: new FormControl(
                  {
                    value: correo,
                    disabled: false,
                  }
                ),
                username: new FormControl(
                  {
                    value: '',
                    disabled: false,
                  }
                ),
                password: new FormControl(
                  {
                    value: '',
                    disabled: false,
                  }
                ),
              });
          }
        }, (error) => {
          this.principal.mensaje('error','Error :(','Tenemos un error al procesar los datos');
        }
      );
      
    }
  }

  unCliente: Cliente = new Cliente ();
  unUsuario: Usuario = new Usuario();
  unRol: Enum = new Enum();
  unTC: Enum = new Enum();
  registrar(){
    this.unRol.idRol = 3;
    if(!this.formRegistro.value['checked']){
      this.unTC.idTipoDoc = 1
    } else {
      this.unTC.idTipoDoc = 2
    }    
    this.unUsuario.Status = true;
    if(!this.porCorreo){
      this.unUsuario.password = this.generarUserPass(this.formRegistro.value['nombre'],this.formRegistro.value['apellidos'],this.formRegistro.value['fechaNac']);
      this.unUsuario.username = this.generarUserPass(this.formRegistro.value['nombre'],this.formRegistro.value['apellidos'],this.formRegistro.value['fechaNac']);
    } else{
      this.unUsuario.password = this.formRegistro.value['password'];
      this.unUsuario.username =this.formRegistro.value['username'];
    }
    
    this.unUsuario.idRol = this.unRol;
    this.unCliente.apellido = this.formRegistro.value['apellidos'];
    this.unCliente.correo= this.formRegistro.value['correo'];
    this.unCliente.direccion= this.formRegistro.value['direccion'];
    this.unCliente.fechaNac= this.formRegistro.value['fechaNac'];
    this.unCliente.nombre= this.formRegistro.value['nombre'];
    this.unCliente.numDocumento= this.formRegistro.value['numDoc'];
    this.unCliente.telefono= this.formRegistro.value['numCel'];
    this.unCliente.idTipoDoc=this.unTC;
    this.unCliente.idUserCliente = this.unUsuario;
    if(this.selectedDepartmentCode != undefined){
      this.unCliente.ubigueo= this.selectedDepartmentCode+this.selectedProvinceCode+this.selectedDistrictCode;
    }    
    console.log("🔥 > RegistroComponent > unCliente:", this.unCliente)
    this.serviceCliente.registrar(this.unCliente, this.auth.getToken()).subscribe(
      (data) => {
        console.log("🔥 > RegistroComponent > registrar > data:", data)
        Swal.fire({
          title: 'Usuario creado',
          text: 'Bienvenid@ a nuestra familia :)',
          icon: 'success',
          confirmButtonText: 'Ok',
          showCloseButton: true,
        }).then((result) => {
          if (result.isConfirmed) {            
            this.router.navigate(['login']);
          }
        });
      }, (error) => {
        this.principal.mensaje('error', 'Error en creacion de usuario', error.mensaje);
      }
    );
  }

  generarUserPass(nombre?: string, apellido?: string, fecha?: Date) {
    let userpass = '';
    if (nombre !== undefined) {
      const primeraLetraNombre = nombre.charAt(0);
      const apellidoSinAcentos = apellido?.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Eliminar acentos en el apellido
      const apellidoSinEspacios = apellidoSinAcentos?.replace(/\s/g, ''); // Eliminar espacios en el apellido
      userpass = primeraLetraNombre + apellidoSinEspacios + fecha?.getDate() + fecha?.getMonth() + fecha?.getFullYear();
    }
    return userpass;
  }
  
}
