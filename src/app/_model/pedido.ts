import { Cliente } from "./cliente";
import { Comprobante } from "./comprobante";
import { Enum } from "./enum";
import { PaqueteFilter } from "./filter/paqueteFilter";
import { Producto } from "./producto";

export class Pedido {
	idPedido!: number;
	idProduct: PaqueteFilter [] = [];
	fechaCompra: Date = new Date();
	observaciones!: string;
	cantidadCompra!: number;
	nombreRecojo!: string;
	apellidoRecojo!: string;
	celularRecojo!: string;
	correoRecojo!: string;
	direccionComp!: string;
}