import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Message, MessageResp } from '../../models/Data/Mensaje';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private apiUrl  = '/api/comunicaciones';


  // private apiUrl = environment.apiUposrl + '/siniestros';


  constructor(private http : HttpClient) {

  }


  getMensajes():Observable<MessageResp[]>{
    return this.http.get<MessageResp[]>(this.apiUrl).pipe(
      map(
        data => data
      ),
      catchError(
        err => throwError( () => err.error.message)
      )
    )
  }

  getMessageById( id : number ):Observable<Message[]>{
    let params = new HttpParams;

    params = params.append('id', id);

    return this.http.get<Message[]>(this.apiUrl, {params}).pipe(
      map(data => data),
      catchError(
        err => throwError( () => err.error.message)
      )
    )
  }


  postMessage( nuevoMensaje : Message):Observable<MessageResp>{
    return this.http.post<MessageResp>(this.apiUrl, nuevoMensaje).pipe(
      map(data => data),
      catchError(
        err => throwError( () => err.error.message)
      )
    )

  }

}
