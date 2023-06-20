import { Enum } from "../enum";
import { Producto } from "../producto";
import { tallaColorFilter } from "./tallaColorFilter";

export class RegistroProductFilter {

    producto: Producto = new Producto();
    tallaColorFilters:  tallaColorFilter[] = [];
 
}