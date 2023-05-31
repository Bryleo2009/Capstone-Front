import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '@app/_model/cliente';
import { Departamento } from '@app/_model/ubigeo/departamento';
import { Distrito } from '@app/_model/ubigeo/distrito';
import { Provincia } from '@app/_model/ubigeo/privincia';
import { ClienteService } from '@app/_service/modelos/cliente.service';
import { AuthService } from '@app/_service/rutas/auth.service';
import { AppComponent } from '@app/app.component';
import { environment } from '@env/environment.development';
import { GoogleAuthProvider } from 'firebase/auth';

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
    private auth: AuthService
  ) {}
  form!: FormGroup;
  porCorreo: boolean = true;
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

    this.form = new FormGroup({
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
        value: '',
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
              this.form = new FormGroup({
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
                  value: '',
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
                    value: '',
                    disabled: false,
                  }
                ),
                username: new FormControl(
                  {
                    value: correo,
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
  registrar(){
    this.unCliente
  }
}
