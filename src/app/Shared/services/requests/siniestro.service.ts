import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Siniestro, SiniestroPost, SiniestroResp } from '../../models/Data/Siniestro';

@Injectable({
  providedIn: 'root'
})
export class SiniestroService {
  private apiUrl  = '/api/siniestros';


  // private apiUrl = environment.apiUrl + '/siniestros';


  constructor(private http : HttpClient) {

  }


  getSiniestros():Observable<Siniestro[]>{
    return this.http.get<Siniestro[]>(this.apiUrl).pipe(
      map(
        data => data
      ),
      catchError(
        err => throwError( () => err.error.message)
      )
    )
  }

  getSiniestroById( id : number ):Observable<Siniestro[]>{
    let params = new HttpParams;

    params = params.append('id', id);

    return this.http.get<Siniestro[]>(this.apiUrl, {params}).pipe(
      map(data => data),
      catchError(
        err => throwError( () => err.error.message)
      )
    )
  }


  postSiniestros( nuevoSiniestro : SiniestroPost):Observable<SiniestroResp>{
    return this.http.post<SiniestroResp>(this.apiUrl, nuevoSiniestro).pipe(
      map(data => data),
      catchError(
        err => throwError( () => err.error.message)
      )
    )

  }

}
