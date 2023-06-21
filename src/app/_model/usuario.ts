import { Enum } from './enum';
import { Rol } from './rol';

export class Usuario {
  idUser!: number;
  username!: string;
  password!: string;
  Status!: boolean;
  idRol!: Enum;
}
