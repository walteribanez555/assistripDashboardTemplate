import { Component, EventEmitter, Input, OnInit, inject } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Beneficiario } from 'src/app/Shared/models/Data/Beneficiario';
import {  MessageResp } from 'src/app/Shared/models/Data/Mensaje';
import { Siniestro } from 'src/app/Shared/models/Data/Siniestro';
import { MensajeService } from 'src/app/Shared/services/requests/mensaje.service';

@Component({
  selector: 'list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.css']
})
export class ListMessagesComponent implements OnInit {

  private eventsSubscription: Subscription | null = null;

  @Input() events!: Observable<MessageResp>;

  @Input() siniestro! : Siniestro;
  @Input() beneficiario! : Beneficiario;

  loading : boolean = false;

  private mensajesService  = inject(MensajeService);

  listMessages  : MessageResp[] = [];


  ngOnInit(): void {

    this.eventsSubscription = this.events.subscribe(( data ) => {
      this.addMessageToList(data);
    } );

    this.loading = true;
    this.mensajesService.getMensajes().pipe(

    ).subscribe(
      {
        next: (data) => {
           data = data.filter( message => message.siniestro_id === this.siniestro.siniestro_id );
           this.listMessages = data;
           this.listMessages = this.listMessages.reverse();
           this.loading = false;
          },
        error : (err) => {
          console.log(err);
          this.loading=  false
        },

      }


    )

  }

  addMessageToList(newMessage : MessageResp) {
    this.listMessages.unshift(newMessage);
  }


}
