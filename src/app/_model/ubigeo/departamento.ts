import { Provincia } from './privincia';

export class Departamento {
    nombre_departamento!: string;
    cod!: string;
    provincias: Provincia[] | undefined;    
}