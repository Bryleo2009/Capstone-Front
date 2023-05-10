import { Enum } from "./enum";
import { Usuario } from "./usuario";

export class Comprobante {

	idComp!: number;
	nomClienteComp!: string;
	identclienteComp!: string;
	montoSubtotalComp!: number;
	montoTotalComp!: number;
	fechaEmiComp!: Date;
	idUser: Usuario = new Usuario();
	idEstCompro: Enum[] = [];
	idTp: Enum[] = [];
	idTc: Enum[] = [];
}