import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  siniestroId : number = -1;
  siniestro : Siniestro | null = null;

  ngOnInit(): void {
    this.route.params.subscribe( params => {
        this.siniestroId = +params['id'];
        this.siniestrosService.getSiniestroById(this.siniestroId).subscribe(
          {
            next : (data) => { this.siniestro = data[0]},
            error : (error) => { console.log(error)  }
          }
        )

    }

    )
  }


}
