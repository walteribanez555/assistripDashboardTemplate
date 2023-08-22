import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  savePolizasToUpdate( data : any[] ){

    localStorage.removeItem("POLIZAS");

    const listPolizas : any[] =[];


    data.forEach( item => {
      listPolizas.push(item.response);
    })

    const polizasToStorage =  JSON.stringify(listPolizas);

    localStorage.setItem( "POLIZAS", polizasToStorage);
  }



  getPolizasToUpdate(){

    let listPolizas : any[] = [];
    const data = localStorage.getItem("POLIZAS");



    if(data){
     listPolizas =    JSON.parse(data);
    }


    return listPolizas;
  }
}
