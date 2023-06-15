export interface Cliente{
    cliente_id : number,
    tipo_cliente : number,
    apellido: string,
    nombre : string,
    nit_ci : string,
    fecha_registro : string,
    origen : string,
    email: string,
    nro_contacto: string,
    status: number
}







export interface ClientePost extends Omit<Cliente, 'cliente_id'|'status'|'tipo_cliente' | 'fecha_registro'>{


}


export interface ClienteResp extends Omit<Cliente, 'fecha_registro' | 'cliente_id'>{
    id : number;
    errno? :  string;


}

