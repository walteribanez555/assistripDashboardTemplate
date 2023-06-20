import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Beneficiario } from 'src/app/Shared/models/Data/Beneficiario';
import { MessageResp } from 'src/app/Shared/models/Data/Mensaje';
import { Siniestro } from 'src/app/Shared/models/Data/Siniestro';
import { BeneficiariosService } from 'src/app/Shared/services/requests/beneficiarios.service';
import { PolizasService } from 'src/app/Shared/services/requests/polizas.service';
import { SiniestroService } from 'src/app/Shared/services/requests/siniestro.service';

@Component({
  templateUrl: './siniestro.component.html',
  styleUrls: ['./siniestro.component.css']
})
export class SiniestroComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private siniestrosService = inject(SiniestroService);

  addToChildMessage: Subject<MessageResp> = new Subject<MessageResp>();


  loading : boolean = false;

  siniestroId : number = -1;
  siniestro : Siniestro | null = null;
  beneficiario : Beneficiario | null = null;

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe( params => {
        this.siniestroId = +params['id'];
        this.siniestrosService.getSiniestroById(this.siniestroId).subscribe(
          {
            next :  (data)  => { this.loading=false;  this.siniestro = data[0]},
            error : (error) => { this.loading=false;  console.log(error)  }
          }
        )

    }

    )
  }

  haveBeneficiario(beneficiario : Beneficiario){
    this.beneficiario = beneficiario;
  }

  onAddMessage( newMessage : MessageResp){
    this.addToChildMessage.next(newMessage);
  }



}
