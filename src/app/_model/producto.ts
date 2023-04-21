import { Categoria } from "./categoria";
import { TipoProducto } from "./tipoProducto";

export class Producto {

	idProduct!: number;
	descripcionProduct!: string;
	nombreProduct!: string;
	precioUni!: number;
	stockProduct!: number;
	tallaProduct!: string;
	etiquetas!: string;
	isPrecioDescProduct!: boolean;
	precioDescuProduct!: number;
	imagen!: string;
	idCateg!: Categoria;
	idTipoProduc!: TipoProducto;
}
