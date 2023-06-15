import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { catchError, switchMap, throwError } from 'rxjs';
import { Beneficiario } from 'src/app/Shared/models/Data/Beneficiario';
import { BeneficioExtra } from 'src/app/Shared/models/Data/BeneficioExtra.model';
import { Poliza } from 'src/app/Shared/models/Data/Poliza';
import { DateOnlyPipe } from 'src/app/Shared/pipes/getDateOnly.pipe';
import { BeneficiariosPolizasService } from 'src/app/Shared/services/requests/beneficiarios-polizas.service';
import { BeneficiariosService } from 'src/app/Shared/services/requests/beneficiarios.service';
import { ExtrasPolizasService } from 'src/app/Shared/services/requests/beneficiosExtras.service';
import { PolizasVentasService } from 'src/app/Shared/services/requests/polizas-ventas.service';
import { PolizasService } from 'src/app/Shared/services/requests/polizas.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';



@Component({
  selector: 'poliza',
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.css'],
  providers: [DateOnlyPipe]
})
export class PolizaComponent implements OnInit {
    id: number = 0;
    listBeneficiarios : Beneficiario[] = [];
    listExtras : BeneficioExtra[] = [];
    poliza : Poliza | null = null;
    nombre : string = "Mireya Alejandra Barriga Lopez";
    routeSiniestro : string ='';
    loading : boolean = false
    private route = inject(ActivatedRoute);



  constructor(
    private polizaService : PolizasService,
    private beneficiarioService : BeneficiariosService,
    private beneficiosExtrasService : ExtrasPolizasService,
    private beneficiarioPolizaService : BeneficiariosPolizasService,
    private location: Location,

    ) { }

  ngOnInit() {
    this.loading = true
    this.route.params.subscribe(params => {
      this.id = +params['id']; // the plus sign converts the string to a number
      this.polizaService.getPolizasById(this.id).pipe(
        switchMap(poliza => {
            if(poliza.length>0){
              this.poliza = poliza[0];
              return this.beneficiarioPolizaService.getBeneficiariosByPolizas(this.poliza.poliza_id)
                .pipe(
                  catchError( (err)=> {
                    return throwError(err);
                  })
                )
              }else{
                return throwError("No se encontro la poliza");
              }
            }
          ),
        switchMap(data => {
          this.listBeneficiarios = data;
          return this.beneficiosExtrasService.getPolizasExtras()
            .pipe(
              catchError( (err)=> {
                return throwError(err);
              })
            )

        })
      ).subscribe({

          next : (data)=>{
            this.listExtras = data.filter(extra => extra.poliza_id == this.poliza?.poliza_id);
            this.loading = false;
          },
          error: (error) => {
            this.loading =false;
            this.showErrorMsg( error );

          }

        }

      )


    })
  }


  showErrorMsg(msg : string){
    Swal.fire({
      title: 'Hubo un error',
      icon:  'error',
      text: msg,
      showCancelButton: true,
      confirmButtonColor: '#16F80B',
      cancelButtonColor: '#d33',
      denyButtonText: `Finalizar`,
      confirmButtonText: 'Dirigir a lista de polizas',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.location.back();

      }
    })

  }
}


