import { Cliente } from "../Data/Cliente";
import { Poliza } from "../Data/Poliza";
import { Venta } from "../Data/Venta.model";



export interface VentaDatos{
    venta: Venta,
    cliente : Cliente,
    polizas : PolizaDatos[],
    
}


export interface PolizaDatos{
    poliza : Poliza,
    //Añadir siniestros

}