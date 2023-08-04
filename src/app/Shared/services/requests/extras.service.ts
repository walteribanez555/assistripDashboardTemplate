import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Extra } from '../../models/Data/Extra';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {

  // private apiUrl = '/api/extras';
  private apiUrl = environment.apiUrl + '/extras';


  constructor(private http : HttpClient) { }


  getExtras(): Observable<Extra[]>{

    return this.http.get<Extra[]>(this.apiUrl);

  }

  getExtra( id : number) : Observable<Extra>{
    let params = new HttpParams;


    params = params.append('id', id);


    return this.http.get<Extra>(this.apiUrl,{params});

  }


}
