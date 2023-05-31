import { Trabajador } from "../trabajador";
import { PaqueteFilter } from "./paqueteFilter";

export class PedidoFilter {
	idProduct: PaqueteFilter = new PaqueteFilter();
	fechaCompra: Date = new Date();
	nombreRecojo!: string;
	apellidoRecojo!: string;
	celularRecojo!: string;
	correoRecojo!: string;
	direccionRecojo!: string;
    idTraba: Trabajador = new Trabajador();
}