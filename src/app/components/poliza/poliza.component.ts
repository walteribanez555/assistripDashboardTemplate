import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { switchMap } from 'rxjs';
import { Beneficiario } from 'src/app/models/Data/Beneficiario';
import { BeneficioExtra } from 'src/app/models/Data/BeneficioExtra.model';
import { Extra } from 'src/app/models/Data/Extra';
import { Poliza } from 'src/app/models/Data/Poliza';
import { BeneficiariosService } from 'src/app/services/beneficiarios.service';
import { ExtrasPolizasService } from 'src/app/services/beneficiosExtras.service';
import { ExtrasService } from 'src/app/services/extras.service';
import { PolizasService } from 'src/app/services/polizas.service';

@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.css']
})
export class PolizaComponent implements OnInit {
    id: number = 0;
    listBeneficiarios : Beneficiario[] = [];
    listExtras : BeneficioExtra[] = [];
    poliza : Poliza | null = null;


  constructor(
    private route: ActivatedRoute,
    private polizaService : PolizasService,
    private beneficiarioService : BeneficiariosService,
    private beneficiosExtrasService : ExtrasPolizasService,
    
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; // the plus sign converts the string to a number

      this.polizaService.getPolizasById(this.id).pipe(
        switchMap(poliza => {
            this.poliza = poliza[0];
            return this.beneficiarioService.getBeneficiario()
            }
          ),
        switchMap(data => {
          this.listBeneficiarios = data.filter(beneficiario => beneficiario.poliza_id == this.poliza?.poliza_id);
          return this.beneficiosExtrasService.getPolizasExtras();

        })
      ).subscribe(
        data => {

          this.listExtras = data.filter(extra => extra.poliza_id == this.poliza?.poliza_id);


          console.log(this.poliza, this.listBeneficiarios, this.listExtras);

        }

      )


    })
  }
}
