import { Categoria } from "./categoria";
import { Enum } from "./enum";
import { TipoProducto } from "./tipoProducto";

export class Producto {
	idProduct!: number;
	iup!: string;
	descripcionProduct!: string;
	nombreProduct!: string;
	precioUni!: number;
	stockProduct!: number;
	tallaProduct!: string;
	colorProduct!: string;
	etiquetas!: string;
	isPrecioDescProduct!: boolean;
	precioDescuProduct!: number;
	imagen!: string;
	idCateg: Categoria = new Categoria();
	idTipoProduc: Enum = new Enum();
	idEtiqueta: Enum[] = [];
	idMarca: Enum = new Enum();
}
