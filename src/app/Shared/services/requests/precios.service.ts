import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Precio } from '../../models/Data/Precio';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {

  private apiUrl = '/api/precios';

  // private apiUrl = environment.apiUrl + '/precios';
  

  constructor(private http : HttpClient) { }

  getPrecios(): Observable<Precio[]>{


    return this.http.get<Precio[]>(this.apiUrl);

  }

  getPreciosById(id : number) : Observable<Precio>{

    let params = new HttpParams;

    params = params.append('id', id);

    return this.http.get<Precio>(this.apiUrl, { params });

  }

}
