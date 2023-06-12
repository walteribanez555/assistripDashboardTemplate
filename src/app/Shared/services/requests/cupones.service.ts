import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cupon, CuponPost } from '../../models/Data/Cupon';

@Injectable({
  providedIn: 'root'
})
export class CuponesService {

  private apiUrl = '/api/cupones'
  // private apiUrl = environment.apiUrl + '/cupones';

  constructor(private http : HttpClient) { }


  getCupones(): Observable<Cupon[]>{

    return this.http.get<Cupon[]>(this.apiUrl);

  }

  getCuponById(id : number): Observable<Cupon[]>{
    let params = new HttpParams;

    params = params.append('id', id);    

    return this.http.get<Cupon[]>(this.apiUrl, {params});
  }



  

  postCupon(nuevoCupon : CuponPost) : Observable<Cupon>{
    return this.http.post<Cupon>(this.apiUrl, {
      servicio_id : nuevoCupon.servicio_id,
      valor : nuevoCupon.valor,
      tipo_valor : nuevoCupon.tipo_valor,
      fecha_desde : nuevoCupon.fecha_desde,
      fecha_hasta : nuevoCupon.fecha_hasta,
      status: nuevoCupon.status

    })

  }

  editCupon(id : number, cuponModificado : CuponPost): Observable<Cupon[]>{
    let params = new HttpParams;

    const url = `${this.apiUrl}?id=${id}`;

    console.log(url);

    params = params.append('id', id);    

    return this.http.put<Cupon[]>(url,{
      servicio_id : cuponModificado.servicio_id,
      valor : cuponModificado.valor,
      tipo_valor : cuponModificado.tipo_valor,
      fecha_desde : cuponModificado.fecha_desde,
      fecha_hasta : cuponModificado.fecha_hasta,
      status: cuponModificado.status

    }  );
  }
}
