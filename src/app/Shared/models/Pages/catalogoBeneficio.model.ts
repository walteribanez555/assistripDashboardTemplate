import { Catalogo } from "../Data/Catalogo";
import { Plan } from "../Data/Plan";

export interface catalogoBeneficio { 
    tipo_beneficio : Catalogo,
    beneficios : Plan[],
    isSubDropdownOpen : boolean,
}