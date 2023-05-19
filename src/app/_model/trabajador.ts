import { Cliente } from "./cliente";
import { Usuario } from "./usuario";

export class Trabajador extends Cliente {
    imagen!: string;
    idUserTrabajador: Usuario = new Usuario();
    isTrabajador!: boolean;
  }
  