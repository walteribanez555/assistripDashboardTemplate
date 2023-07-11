import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolizaLocalService {

  constructor() { }


  saveToLocal(polizaId : number){
    localStorage.removeItem('poliazId'),
    localStorage.setItem('polizaId' , polizaId.toString())
  }


  getFromLocal(){

    const polizaId = localStorage.getItem('polizaId');

    if(polizaId){

      return +polizaId
    }


    throw new Error("Poliza not found");

  }
}
