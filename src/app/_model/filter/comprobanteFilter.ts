import { Cliente } from "../cliente";
import { Enum } from "../enum";
import { ProductoStorage } from "./productoStorage";

export class ComprobanteFilter{
    cliente : Cliente = new Cliente();
    productos : ProductoStorage[]=[];
    montoProducto !: number;
    igv !: number;
    ammount !: number;
    direccionComp !: string;
    ubigeoComp !: string;
	idTc: Enum[] = [];
}