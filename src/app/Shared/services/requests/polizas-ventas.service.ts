import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Poliza } from '../../models/Data/Poliza';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolizasVentasService {

  constructor(
    private http : HttpClient

  ) { }

  // private apiUrl  = '/api/polizaVenta';
  private apiUrl = environment.apiUrl + '/polizaVenta';


  getPolizasByVentas( id : number): Observable<Poliza[]>{
    let params = new HttpParams;

    params = params.append('id', id);

    return this.http.get<Poliza[]>(this.apiUrl, {params}).pipe(
      map(
        data => data
      ),
      catchError(
        err => throwError( () => err.error.message )
      )


    )



  }
}
