import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente, ClientePost, ClienteResp } from '../../models/Data/Cliente';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private apiUrl : string = '/api/clientes';
  // private apiUrl = environment.apiUrl + '/clientes';

  constructor(private http: HttpClient) {

   }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }


  getClienteById(id : string): Observable<Cliente[]>{
     let params  = new HttpParams;

     params = params.append('id', id);

     return this.http.get<Cliente[]>(this.apiUrl,{params});
  }

  postCliente(cliente : ClientePost) :Observable<ClienteResp>{


    const data = {
      tipo_cliente : 1,
      nombre : cliente.nombre,
      apellido : cliente.apellido,
      nit_ci : cliente.nit_ci,
      origen : cliente.origen,
      email : cliente.email,
      nro_contacto : cliente.nro_contacto,
      status: 1,

    }

    return this.http.post<ClienteResp>(this.apiUrl, data).pipe(
        map((response: ClienteResp) => {
          if (response.errno) {
            throw new Error("El email del titular ya se encuentra registrado");
          } else {
            return response;
          }
        }),
        catchError((error: HttpErrorResponse) => {

          return throwError(error.message);
        })
      )
    }




}
