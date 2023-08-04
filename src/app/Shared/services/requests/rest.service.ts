import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  getOrderDetail(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/orders/${id}`)
  }

  sendPayment(token: string, id: string): Promise<any> {
    return this.http.patch(`${environment.apiUrl}/orders/${id}`,
      {
        token
      }).toPromise()
  }

  generateOrder(data: { name: string, amount: number }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/orders`, data)
  }

  confirmOrder(id:string): Promise<any> {
    return this.http.patch(`${environment.apiUrl}/orders/confirm/${id}`, {}).toPromise()
  }
}
