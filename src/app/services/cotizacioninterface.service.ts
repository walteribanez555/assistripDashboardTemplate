import { Injectable } from '@angular/core';
import { FormCotizarModel } from '../models/Pages/formCotizar.model';
import { Servicio } from '../models/Data/Servicio';
import { cotizacionDataForm } from '../models/Pages/cotizacionDataForm.model';
import { ExtraForm } from '../models/Pages/extra.model';

@Injectable({
  providedIn: 'root'
})
export class cotizacionIntefaceService {
  sharedData: FormCotizarModel = {
    initialDate: '',
    finalDate: '',
    tags: [],
    origen: '',
    listCotizaciones : [],
    email: '',
    telefono: '',
  };

  servicioMenores: Servicio| null= null;
  servicioMayores: Servicio | null = null;

  cotizacionMenores :cotizacionDataForm[] = [];
  cotizacionMayores :cotizacionDataForm[] = [];

  listExtras : ExtraForm[]= [];



  listPolizas : number[] = [];
  listClientes : number[] = [];

}