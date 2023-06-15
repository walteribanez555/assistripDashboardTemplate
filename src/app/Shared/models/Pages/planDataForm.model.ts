import { Plan } from "../Data/Plan";
import { Servicio } from "../Data/Servicio";
import { tipoBeneficio } from "./tipoBeneficio.model";


export interface planDataForm {
    data_servicio : Servicio,
    beneficios : Plan[],

}