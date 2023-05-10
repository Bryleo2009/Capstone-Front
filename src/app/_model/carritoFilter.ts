import { Producto } from "./producto";
import { Enum } from "./enum";


export class CarritoFilter{
	idProduct : Producto = new Producto();
    idTalla: Enum[] = [];
    idColor: Enum[] = [];
	cantidad!: number;
}