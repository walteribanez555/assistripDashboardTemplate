import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetLocationService {

  mapBox_Token = environment.mapBox_Token;

  constructor(private http : HttpClient) {

   }


   getLocation(lat : number, lng : number){
    
    return this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=country&access_token=${this.mapBox_Token}`)
   }
  


}
