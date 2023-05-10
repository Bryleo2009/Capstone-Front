import { Distrito } from './distrito';
export class Provincia {
    nombre_provincia!: string;
    cod!: string;
    distritos: Distrito [] | undefined;
}