import { Servicio } from "../Data/Servicio"
import { ExtraForm } from "./extra.model"
import { policie } from "./policie.model"

export interface policiesForm{
    id : number,
    isDropdownOpen :boolean,
    isPlainSelected: boolean,
    isFinished: boolean,
    poliza : policie,
    date : string,
    listPlanes : Servicio[],
    polizaNombre : string,
    listExtras : ExtraForm[],
    
}