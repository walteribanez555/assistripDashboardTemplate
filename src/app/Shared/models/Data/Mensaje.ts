// Generated by https://quicktype.io

export interface Message {
  comunicacion_id: number;
  siniestro_id:    number;
  mensaje:         string;
  url_archivo:     string;
  fecha_mesaje:    string;
  es_operador:     number;
}


// Generated by https://quicktype.io

// export interface SiniestroPost extends Omit<Siniestro,'siniestro_id'> {
// }

export interface MessageResp extends Omit<Message, 'comunicacion_id'> {
  id:              number;

}
