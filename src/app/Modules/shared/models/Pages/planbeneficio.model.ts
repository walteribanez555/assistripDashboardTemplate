import { Plan } from "../Data/Plan";
import { Servicio } from "../Data/Servicio";
import { catalogoBeneficio } from "./catalogoBeneficio.model";

export interface planbeneficio {
    serv : Servicio | null,
    beneficios : catalogoBeneficio[],
    isDropdownOpen : boolean,
    precio : number,


}

