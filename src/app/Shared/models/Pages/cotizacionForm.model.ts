import { FormGroup } from "@angular/forms";
import { Servicio } from "../Data/Servicio";
import { ExtraForm } from "./extra.model";

export interface cotizacionForm { 
    id : number,
    isDropdownOpen :boolean,
    isPlainSelected: boolean,
    isFinished: boolean,
    age: number,
    listPlanes : Servicio[],
    listExtras : ExtraForm[],
    itemForm: FormGroup;

}