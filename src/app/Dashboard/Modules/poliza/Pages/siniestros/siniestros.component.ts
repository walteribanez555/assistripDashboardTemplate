import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BeneficiariosService } from 'src/app/Shared/services/requests/beneficiarios.service';
import { Subject, catchError, switchMap, throwError } from 'rxjs';
import { Beneficiario } from 'src/app/Shared/models/Data/Beneficiario';
import { SiniestroService } from 'src/app/Shared/services/requests/siniestro.service';
import { Siniestro, SiniestroResp } from 'src/app/Shared/models/Data/Siniestro';
import Swal from 'sweetalert2';
import { PolizasService } from 'src/app/Shared/services/requests/polizas.service';
import { Poliza } from 'src/app/Shared/models/Data/Poliza';


@Component({
  templateUrl: './siniestros.component.html',
  styleUrls: ['./siniestros.component.css']
})
export class SiniestrosComponent implements OnInit{


  private route = inject(ActivatedRoute);
  private beneficiariosService = inject(BeneficiariosService);
  private siniestrosService = inject(SiniestroService);
  private polizaService = inject(PolizasService);
  polizaId  : number = -1;
  loading  : boolean = false;
  poliza : Poliza | null = null;

  listBeneficiarios : Beneficiario[] = [];
  listSiniestros : Siniestro[] = [];


  constructor(private location: Location) {

  }


  ngOnInit(): void {

    this.loading = true;
      this.route.params.subscribe( params =>{
        this.polizaId = +params['id'];
          this.beneficiariosService.getBeneficiarioById(this.polizaId).pipe(
            switchMap(
              data =>{

                this.listBeneficiarios = data;
                return this.polizaService.getPolizasById(this.polizaId).pipe(
                  catchError( (err)=> {
                    return throwError(err);
                  })
                )
              }

            ),
            switchMap(
              data => {
                this.poliza = data[0];
                //Debe cambiarse por metodo diferente

                return this.siniestrosService.getSiniestros().pipe(
                  catchError( (err)=> {
                    return throwError(err);
                  })
                )

              }
            ),



          ).subscribe(
            {
              next : (data) => {
                this.loading =false;
                this.listSiniestros = data;
                this.listSiniestros = this.listSiniestros.filter( siniestro => this.listBeneficiarios.some( beneficio => beneficio.beneficiario_id=== siniestro.beneficiario_id));
              },
              error: (error) => {

                this.loading =false;
                this.showErrorMsg( error );

              }


            }
          )


        }
       )
  }

  backBtn(){
    this.location.back();
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

  onAddSiniestro( siniestroResp : SiniestroResp){


    const siniestroToChild : Siniestro = {
      siniestro_id : +siniestroResp.id,
      tipo_siniestro : siniestroResp.tipo_siniestro,
      beneficiario_id : +siniestroResp.beneficiario_id,
      descripcion : siniestroResp.descripcion.length>0? siniestroResp.descripcion : '0' ,
      pais_ocurrencia : siniestroResp.pais_ocurrencia.length>0 ? siniestroResp.pais_ocurrencia : '0',
      ciudad_ocurrencia : siniestroResp.ciudad_ocurrencia.length>0 ? siniestroResp.ciudad_ocurrencia : '0',
      url_archivo : siniestroResp.url_archivo.length>0 ? siniestroResp.url_archivo : '0',
      fecha_siniestro : siniestroResp.fecha_siniestro.length>0 ? siniestroResp.fecha_siniestro : '0',
    }



    this.listSiniestros.push(siniestroToChild);


  }






}
