import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {  Subject } from 'rxjs';
import { EventService } from 'src/app/Shared/services/interfaces/event.service';





@Component({
  selector: 'cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})
export class CotizarComponent implements OnInit{

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
