import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan } from '../../models/Data/Plan';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  private apiUrl = '/api/planes';
  // private apiUrl = environment.apiUrl + '/planes';

  constructor(private http : HttpClient) { }



  getPlanes(): Observable<Plan[]>{


    return this.http.get<Plan[]>(this.apiUrl);
  }


  getPlanById(id : number): Observable<Plan[]>{

    let params = new HttpParams;

    params = params.append('id', id);

    return this.http.get<Plan[]>(this.apiUrl, { params });

  }

}
