// {
//     "poliza_id": 1,
//     "venta_id": 1,
//     "servicio_id": 1,
//     "destino": "ESTADOS UNIDOS",
//     "fecha_salida": "2023-04-01T00:00:00.000Z",
//     "fecha_retorno": "2023-05-01T00:00:00.000Z",
//     "nro_poliza": null,
//     "nro_dias": 31,
//     "extra": 1,
//     "fecha_emision": "2023-03-08T23:36:28.000Z"
// }

export interface Poliza {
    poliza_id: number,
    venta_id: number,
    servicio_id : number,
    destino: string,
    fecha_salida : string,
    fecha_retorno: string,
    nro_poliza : number,
    nro_dias: number,
    extra: number,
    fecha_emision : string,
    status : number,
}


export interface PolizaResp extends Omit<Poliza, 'poliza_id'>{
    id : number;

}


