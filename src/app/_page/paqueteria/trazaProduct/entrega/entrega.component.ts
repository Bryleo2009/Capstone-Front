import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Departamento } from '@app/_model/ubigeo/departamento';
import { Distrito } from '@app/_model/ubigeo/distrito';
import { Provincia } from '@app/_model/ubigeo/privincia';
import { SessionComponent } from '@app/_page/cliente/login/session/session.component';
import { DataService } from '@app/_service/modelos/data.service';
import { AuthService } from '@app/_service/rutas/auth.service';
import { environment } from '@env/environment.development';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.component.html',
  styleUrls: ['./entrega.component.css'],
})
export class EntregaComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private almacen: AuthService,
    private dataService: DataService,
    private messageService: MessageService,
  ) {}

  isWrap = true;
  checked!: boolean;
  formEntrega!: FormGroup;
  logeado!: boolean;
  ngOnInit() {
    this.logeado = this.dataService.obtenerLogueado();
    this.dataService.logeado$.subscribe(() => {
      this.logeado = this.dataService.obtenerLogueado();
    });
    //cargar JSOn de ubigeo
    this.http.get<Departamento[]>('./assets/ubigeo.json').subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.log('Error al cargar el archivo JSON:', error);
      }
    );

    this.formEntrega = new FormGroup({
      departamentoPaciente: new FormControl({
        value: '',
        disabled: false,
      },
      [Validators.required]),
      provinciaPaciente: new FormControl({
        value: '',
        disabled: false,
      },
      [Validators.required]),
      distritoPaciente: new FormControl({
        value: '',
        disabled: false,
      },
      [Validators.required]),
      nombre: new FormControl({
        value: this.almacen.getCliente().nombre,
        disabled: false,
      },
      [Validators.required]),
      apellidos: new FormControl({
        value: this.almacen.getCliente().apellido,
        disabled: false,
      },
      [Validators.required]),
      celular: new FormControl({
        value: this.almacen.getCliente().telefono,
        disabled: false,
      },
      [Validators.required]),
      correo: new FormControl(
        {
          value: this.almacen.getCliente().correo,
          disabled: false,
        },
        [Validators.email, Validators.required]
      ),
      direccion: new FormControl({
        value: this.almacen.getCliente().direccion,
        disabled: false,
      },
      [Validators.required]),
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
      this.dataService.enviar_ubigeo(
        this.selectedDepartmentCode +
          '' +
          this.selectedProvinceCode +
          '' +
          this.selectedDistrictCode
      );

      console.log(
        'ubigeo seleccionado: >',
        this.selectedDepartmentCode,
        this.selectedProvinceCode,
        this.selectedDistrictCode
      );
    }
  }

  evaluar(){
    if(
      this.formEntrega.value['nombre'] !== '' &&
      this.formEntrega.value['apellidos'] !== '' &&
      this.formEntrega.value['celular'] !== '' &&
      this.formEntrega.value['correo'] !== '' &&
      this.formEntrega.value['direccion'] !== '' &&
      this.selectedDepartment?.cod != undefined &&
      this.selectedProvince?.cod != undefined &&
      this.selectedDistrict?.cod != undefined
    ){
      this.dataService.enviar_nombreRecojo(this.formEntrega.value['nombre']);
      this.dataService.enviar_apellidoRecojo(this.formEntrega.value['apellidos']);
      this.dataService.enviar_celularRecojo(this.formEntrega.value['celular']);
      this.dataService.enviar_correoRecojo(this.formEntrega.value['correo']);
      this.dataService.enviar_direccionRecojo(this.formEntrega.value['direccion']);
      this.messageService.add({
        severity: 'success',
        summary: 'Registrado',
        detail: 'Datos registrados correctamente',
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: 'Datos incompletos en formulario',
      });
    }
  }
}
