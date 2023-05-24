import { Usuario } from "./usuario";

export class Cliente {
	id!: number;
	nombre!: string;
	apellido!: string;
	fechaNac: Date = new Date();
	telefono!: string;
	direccion!: string;
	ubigueo!: string;
	numDocumento!: string;
	correo!: string;
	idUserCliente: Usuario = new Usuario();
}