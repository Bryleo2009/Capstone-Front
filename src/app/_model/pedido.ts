import { Cliente } from "./cliente";
import { Comprobante } from "./comprobante";
import { Enum } from "./enum";
import { Producto } from "./producto";

export class Pedido {

	idPedido!: number;
	idProduct : Producto = new Producto();
	cantidad!: number;
	idComp : Comprobante = new Comprobante();
	idCliente: Cliente = new Cliente();	
    idEstProduct : Enum = new Enum();
	username!: string;
}