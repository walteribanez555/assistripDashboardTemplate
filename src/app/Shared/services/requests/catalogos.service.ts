import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Catalogo } from '../../models/Data/Catalogo';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  
  private apiUrl  = '/api/catalogos';

  // private apiUrl = environment.apiUrl + '/catalogos';

  constructor( private http : HttpClient) {  }

  getCatalogo(id : string): Observable<Catalogo[]>{

    let params = new HttpParams;

    
    params = params.append('id',id);

    return this.http.get<Catalogo[]>(this.apiUrl, {params});
    

  }


  getPaises(): Observable<Catalogo[]> {


    let params = new HttpParams;
    params = params.append('id',"paises");
    return this.http.get<Catalogo[]>(this.apiUrl, {params});

  }

  getBeneficios(): Observable<Catalogo[]> {

    let params = new HttpParams;
    params = params.append('id',"beneficios");
    return this.http.get<Catalogo[]>(this.apiUrl, {params});
  }

}
