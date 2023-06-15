import { Component, Input, OnInit, inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { Beneficiario } from 'src/app/Shared/models/Data/Beneficiario';
import { Catalogo } from 'src/app/Shared/models/Data/Catalogo';
import { Siniestro } from 'src/app/Shared/models/Data/Siniestro';
import { BeneficiariosService } from 'src/app/Shared/services/requests/beneficiarios.service';
import { BeneficiosService } from 'src/app/Shared/services/requests/beneficios.service';
import { CatalogosService } from 'src/app/Shared/services/requests/catalogos.service';

@Component({
  selector: 'data-siniestro',
  templateUrl: './data-siniestro.component.html',
  styleUrls: ['./data-siniestro.component.css']
})
export class DataSiniestroComponent implements OnInit {

  @Input() siniestro! : Siniestro;

  private beneficiarioService  = inject(BeneficiariosService);
  private catalogoService = inject(CatalogosService);
  private beneficiario : Beneficiario | null = null;
  private tipoBeneficio : Catalogo | null = null;

  ngOnInit(): void {
      this.beneficiarioService.getBeneficiarioById(this.siniestro.beneficiario_id).pipe(
        switchMap(
          data => {
            this.beneficiario = data[0];

            return this.catalogoService.getBeneficios().pipe(
              catchError( (err)=> {
                return throwError(err);
              })
            )


          }
        )

      ).subscribe(
        {
          next :  ( data  ) => {
            this.tipoBeneficio = data.filter( catalogo => catalogo.catalogo_id === this.siniestro.tipo_siniestro)[0];
          },
          error : ( error ) => {
            console.log(error);
          },
        }

      )
  }



}
