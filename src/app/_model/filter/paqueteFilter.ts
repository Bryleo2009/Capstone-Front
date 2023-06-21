import { ProductoStorage } from '@app/_model/filter/productoStorage';
import { Cliente } from '../cliente';
export class PaqueteFilter {
    paqueteProductos: ProductoStorage[] = [];
    cliente: Cliente = new Cliente();
}