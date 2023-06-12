import { Beneficio } from "../Data/Beneficio";
import { Catalogo } from "../Data/Catalogo";

export interface catalogoBeneficioData { 
    tipo_beneficio : Catalogo,
    beneficios : Beneficio[],
    subDropdownOpen : boolean,
}