import { Cliente } from "../cliente";
import { Enum } from "../enum";
import { Trabajador } from "../trabajador";
import { ProductoStorage } from "./productoStorage";

export class ComprobanteFilter{
    cliente : Cliente = new Cliente();
    productoStorageList : ProductoStorage[]=[];
    montoProducto !: number;
    igv !: number;
    ammount !: number;
    direccionComp !: string;
    ubigeoComp !: string;
	idTc!: boolean;
    ruc!:string;
    razonSocial!:string;
    trabajador: Trabajador = new Trabajador();
    nombreRecojo!: string;
    apellidoRecojo!: string;
    celularRecojo!: string;
    correoRecojo!: string;
}