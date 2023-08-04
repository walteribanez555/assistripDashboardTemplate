import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicio } from '../../models/Data/Servicio';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  // private apiUrl = '/api/servicios';
   private apiUrl = environment.apiUrl + '/servicios';

  constructor(private http: HttpClient) { }

   getServicios(): Observable<Servicio[]>{




      return this.http.get<Servicio[]>(this.apiUrl);

   }

   getServicioById(id : number): Observable<Servicio[]>{
      let params = new HttpParams;

      params = params.append('id', id);

      return this.http.get<Servicio[]>(this.apiUrl, {params});
   }

}
