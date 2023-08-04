import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Beneficiario } from '../../models/Data/Beneficiario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiariosPolizasService {

  constructor(
    private http : HttpClient

  ) { }

  // private apiUrl  = '/api/beneficiariosPoliza';

  private apiUrl = environment.apiUrl + '/beneficiariosPoliza';



  getBeneficiariosByPolizas( id : number): Observable<Beneficiario[]>{
    let params = new HttpParams;

    params = params.append('id', id);

    return this.http.get<Beneficiario[]>(this.apiUrl, {params}).pipe(
      map( data => data),
      catchError( err => throwError( () => err.error.message))


    )



  }





}
