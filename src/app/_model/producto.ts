import { Categoria } from "./categoria";
import { Enum } from "./enum";
import { Etiqueta } from "./etiqueta";
import { TipoProducto } from "./tipoProducto";

export class Producto {
	idProduct!: number;//no se agrega
	iup!: string;//no se agrega
	descripcionProduct!: string;//si
	nombreProduct!: string;//si
	precioUni!: number;//si
	rutaQr!: string;//no se agrega
	isExistente!: boolean;//no se agrega
	isPrecioDescProduct!: boolean;//no se agrega
	precioDescuProduct!: number;//si
	imagen!: string;//si
	idCateg: Categoria = new Categoria();//si
	idTipoProduc: Enum = new Enum();//si
	idEtiqueta: Etiqueta[] = [];//si
	idMarca: Enum = new Enum();//si
}
