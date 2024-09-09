import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Poliza, PolizaResp } from '../../models/Data/Poliza';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PolizasService {


  // private apiUrl = '/api/polizas';
  private apiUrl = environment.apiUrl + '/polizas';

  constructor(private http : HttpClient) { }




  getPolizas() : Observable<Poliza[]>{


    return this.http.get<Poliza[]>(this.apiUrl);
  }

  getPolizasById(id: number) : Observable<Poliza[]>{

    let params = new HttpParams;

    params = params.append('id', id);

    return this.http.get<Poliza[]>(this.apiUrl,{params}).pipe(
      map(
        data => data
      ),
      catchError(
        err => throwError( () => err.error.message )
      )
    )

  }


            //  data.ventaId = ventaId;
            // const poliza = await polizas.post( data );
            // poliza.cantidad = cantidad;
            // poliza.precio = precio;
            // poliza.total = total;
            // poliza.descuento = descuento;
            // poliza.totalPago = totalPago;

            // <span class="vigente" *ngIf="poliza.polizaBeneficiario.status ===0 ">Vigente</span>
            // <span class="congelada" *ngIf="poliza.polizaBeneficiario.status ===1 ">Congelada</span>
            // <span class="uso" *ngIf="poliza.polizaBeneficiario.status ===2 ">En uso</span>
            // <span class="anulada" *ngIf="poliza.polizaBeneficiario.status ===3 ">Anulada</span>


  postPolizas(venta_id: number, servicio_id : number, destino : string,fecha_salida : string, fecha_retorno : string, extra:number):Observable<PolizaResp>{


    return this.http.post<PolizaResp>(this.apiUrl, {
      venta_id,
      servicio_id,
      destino,
      fecha_salida,
      fecha_retorno,
      extra,
      status: 1,
      nro_poliza : 1,
      multiviaje : 1,
      fecha_caducidad: this.getExpirationDate(fecha_salida),
      username : 'web'
    }).pipe(
      map( data => data),
      catchError( err => throwError( () => err.error.message) )
    )

  }

  getExpirationDate(fecha_retorno : string){
    const inputDate = new Date(fecha_retorno);

    // Add one year to the date
    const oneYearLater = new Date(inputDate);
    oneYearLater.setFullYear(inputDate.getFullYear() + 1);
    return oneYearLater.toISOString().split('T')[0];
  }



  putPolizas(poliza_id : number,  fecha_salida : string, fecha_retorno : string, status: number) {
    const urlPut = `${this.apiUrl}?id=${poliza_id}`;

    return this.http.put(urlPut,{
      fecha_salida,
      fecha_retorno,
      status,

    })
  }



}
