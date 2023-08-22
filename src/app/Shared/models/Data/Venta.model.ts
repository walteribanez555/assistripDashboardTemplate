

export interface Venta {
    venta_id : number,
    username : string,
    officeId : number,
    cliente_id : number,
    tipo_venta : number,
    forma_pago : number,
    cantidad : number,
    descuento : number,
    plus : number,
    fecha_salida : string,
    fecha_retorno : string,
    servicio_id : number,
    status : number
    total_pago : number;

}

export interface VentaResp extends Omit<Venta, 'venta_id'>{
  id : number,
  client_secret : string,
}
