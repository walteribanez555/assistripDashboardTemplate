import { Component, OnInit, ViewChild, ElementRef , AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, Subject } from 'rxjs';

import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Beneficio } from 'src/app/Modules/shared/models/Data/Beneficio';
import { Catalogo } from 'src/app/Modules/shared/models/Data/Catalogo';
import { Extra } from 'src/app/Modules/shared/models/Data/Extra';
import { Plan } from 'src/app/Modules/shared/models/Data/Plan';
import { Precio } from 'src/app/Modules/shared/models/Data/Precio';
import { Servicio } from 'src/app/Modules/shared/models/Data/Servicio';
import { catalogoBeneficio } from 'src/app/Modules/shared/models/Pages/catalogoBeneficio.model';
import { catalogoBeneficioData } from 'src/app/Modules/shared/models/Pages/catalogoBeneficioData.model';
import { cotizacionDataForm } from 'src/app/Modules/shared/models/Pages/cotizacionDataForm.model';
import { ExtraForm } from 'src/app/Modules/shared/models/Pages/extra.model';
import { FormCotizarModel } from 'src/app/Modules/shared/models/Pages/formCotizar.model';
import { planDataForm } from 'src/app/Modules/shared/models/Pages/planDataForm.model';
import { planbeneficio } from 'src/app/Modules/shared/models/Pages/planbeneficio.model';
import { tipoBeneficio } from 'src/app/Modules/shared/models/Pages/tipoBeneficio.model';
import { cotizacionIntefaceService } from 'src/app/Modules/shared/services/interfaces/cotizacioninterface.service';
import { EventService } from 'src/app/Modules/shared/services/interfaces/event.service';
import { BeneficiosService } from 'src/app/Modules/shared/services/requests/beneficios.service';
import { CatalogosService } from 'src/app/Modules/shared/services/requests/catalogos.service';
import { ExtrasService } from 'src/app/Modules/shared/services/requests/extras.service';
import { PlanesService } from 'src/app/Modules/shared/services/requests/planes.service';
import { PreciosService } from 'src/app/Modules/shared/services/requests/precios.service';
import { ServiciosService } from 'src/app/Modules/shared/services/requests/servicios.service';
import { UtilsService } from 'src/app/Modules/shared/services/utils/utils.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit{

  eventsSubject: Subject<void> = new Subject<void>();

  constructor(
    private router : Router,
    private eventService : EventService,

  ){

  }


  ngOnInit(): void {

  }


  reloadPage() {

    this.ngOnInit();
  }

  emitEventToChild() {
   this.eventService.reloadPage()
  }



}
