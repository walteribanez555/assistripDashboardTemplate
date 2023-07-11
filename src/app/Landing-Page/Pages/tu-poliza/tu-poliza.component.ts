import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { Beneficiario } from 'src/app/Shared/models/Data/Beneficiario';
import { BeneficioExtra } from 'src/app/Shared/models/Data/BeneficioExtra.model';
import { Poliza } from 'src/app/Shared/models/Data/Poliza';
import { Servicio } from 'src/app/Shared/models/Data/Servicio';
import { BeneficiariosService } from 'src/app/Shared/services/requests/beneficiarios.service';
import { ExtrasPolizasService } from 'src/app/Shared/services/requests/beneficiosExtras.service';
import { PolizasService } from 'src/app/Shared/services/requests/polizas.service';
import { ServiciosService } from 'src/app/Shared/services/requests/servicios.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './tu-poliza.component.html',
  styleUrls: ['./tu-poliza.component.css']
})
export class TuPolizaComponent implements OnInit {

  loading : boolean = false;

  private polizaService = inject(PolizasService);
  private beneficiarioPolizaService = inject(BeneficiariosService);
  private servicioService = inject(ServiciosService);
  private route = inject(ActivatedRoute);
  private extrasService = inject(ExtrasPolizasService);
  private router = inject(Router);



  //Atributos
  polizaId : number  = 0;
  poliza : Poliza | null = null;
  listBeneficiarios : Beneficiario[] = [];
  listExtras : BeneficioExtra[] = [];
  servicio : Servicio | null = null;


  ngOnInit(): void {
    this.loading = true
    this.route.params.subscribe( params  => {
      this.polizaId = +params['id'];
      this.polizaService.getPolizasById(this.polizaId).pipe(
        switchMap(poliza => {
            if(poliza.length>0){
              this.poliza = poliza[0];
              return this.beneficiarioPolizaService.getBeneficiarioById(this.poliza.poliza_id)
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
        switchMap(
          data => {
            this.listBeneficiarios = data;

            if(this.poliza){

              return this.servicioService.getServicioById(this.poliza?.servicio_id);
            }else{
              throw new Error("Poliza not found");
            }


          }

        ),
        switchMap(data => {
          this.servicio = data[0];
          return this.extrasService.getPolizasExtras()
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


            console.log(this.listBeneficiarios);
            console.log(this.poliza);
            console.log(this.servicio);


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
      confirmButtonText: 'Dirigir a la pagina principal',
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigateByUrl('/landing-page/home');
      }
    })

  }






}
