import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plan } from 'src/app/Shared/models/Data/Plan';
import { cotizacionIntefaceService } from 'src/app/Shared/services/interfaces/cotizacioninterface.service';
import { EventService } from 'src/app/Shared/services/interfaces/event.service';
import { PlanesService } from 'src/app/Shared/services/requests/planes.service';


interface PlanExtra extends Plan {
  isSelected : boolean;
}

@Component({
  templateUrl : './extrasPage.component.html',
  styleUrls: ['./extrasPage.component.css'],
})
export class ExtrasPageComponent implements OnInit{



  constructor(
    private router : Router,
    private eventService : EventService,
    private dataService: cotizacionIntefaceService,
    private planesService : PlanesService,

  ){

  }


  extras : PlanExtra[] = [];

  ngOnInit(): void {
    const serv = this.dataService.servicioMenores ?? this.dataService.servicioMayores!;

    console.log({serv});

    this.planesService.getPlanById(serv.servicio_id).subscribe({
      next : ( resp ) => {
        this.extras = resp.filter( item => item.extra ==1).map( item =>{ return  {...item , isSelected : false}});
        console.log({extras : this.extras});
      },
      error : ( err ) => {
        console.log({err});
      },
      complete : () => {

      }

    })


  }


  selectItem ( item : PlanExtra){
    item.isSelected = !item.isSelected;
  }

  next(){

    const selectedItems = this.extras.filter( item => item.isSelected);


    this.dataService.extrasSelected = selectedItems;

    this.router.navigate(['/landing-page/datos-polizas']);

  }

}
