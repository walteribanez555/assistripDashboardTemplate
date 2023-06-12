import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venta } from '../../models/Data/Venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentasService {


    private apiUrl  = '/api/ventas';


    // private apiUrl = environment.apiUrl + '/ventas';


  constructor(private http : HttpClient) {
  
   }


   postVenta(cliente_id : number,cantidad : number,descuento : number,fechaSalida : string, fechaRegreso : string, costoPolizaTotal:  number ) : Observable<Venta>{

    

    return this.http.post<Venta>(this.apiUrl,{
      username : "raforios",
      officeId : 1,
      cliente_id :cliente_id,
      tipo_venta : 1,
      forma_pago : 1,
      cantidad : cantidad,
      descuento : descuento,
      plus : 0,
      fecha_salida : fechaSalida,
      fecha_retorno : fechaRegreso,
      servicio_id : 2,
      total_pago : costoPolizaTotal,
      status:1
    })

   }

   getVentas() : Observable<Venta[]>{
      
      return this.http.get<Venta[]>(this.apiUrl);
  
    }
    




  
}
