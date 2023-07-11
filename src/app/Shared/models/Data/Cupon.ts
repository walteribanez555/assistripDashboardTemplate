
export interface Cupon {
    cupon_id : number,
    fecha_desde : string,
    fecha_hasta : string,
    servicio_id : number,
    status: number,
    tipo_valor : number,
    valor: number,
    nombre : string | null


}

    // "servicio_id" : 1,
    // "tipo_valor" : 1,
    // "valor" : 2,
    // "fecha_desde" : "2023/03/10",
    // "fecha_hasta" : "2023/03/30",
    // "status" : 1

export interface CuponPost extends Omit<Cupon, 'cupon_id'>{

}




export interface CuponAplicado {
    cupon : Cupon,
    monto : number,
    montoTotal: number,

}
