import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Catalogo } from '../../models/Data/Catalogo';
import { BeneficioExtra } from '../../models/Data/BeneficioExtra.model';

@Injectable({
  providedIn: 'root'
})
export class ExtrasPolizasService {

  // private apiUrl  = '/api/polizasExtras';

  private apiUrl = environment.apiUrl + '/polizasExtras';

  constructor( private http : HttpClient) {

   }


   getPolizasExtras(): Observable<BeneficioExtra[]>{
    return this.http.get<BeneficioExtra[]>(this.apiUrl);
   }


   postPolizaExtra(poliza_id : number, beneficio_id: number , monto_adicional: number) {


    return this.http.post(this.apiUrl,{
      poliza_id,
      beneficio_id,
      monto_adicional
    } ).pipe(
      map(
        data => data
      ),
      catchError(
        err => throwError( () => err.error.message )
      )
    )

  }






}
