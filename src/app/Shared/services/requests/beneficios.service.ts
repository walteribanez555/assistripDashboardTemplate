import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Beneficio } from '../../models/Data/Beneficio';

@Injectable({
  providedIn: 'root'
})
export class BeneficiosService {

  // private apiUrl = '/api/beneficios';
  private apiUrl = environment.apiUrl + '/beneficios';

  constructor(private http : HttpClient) { }



  getBeneficios(): Observable<Beneficio[]>{

    return this.http.get<Beneficio[]>(this.apiUrl);

  }


  getBeneficiosById(id : number): Observable<Beneficio>{
    let params = new HttpParams;

    params = params.append('id', id);

    return this.http.get<Beneficio>(this.apiUrl, {params});

  }
}
