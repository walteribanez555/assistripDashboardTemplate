import { Component, Input, OnInit, inject } from '@angular/core';
import { CatalogosService } from '../../services/requests/catalogos.service';
import { error } from '../../directives/custom-label.directive';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Catalogo } from '../../models/Data/Catalogo';
import { PlanesService } from '../../services/requests/planes.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Plan } from '../../models/Data/Plan';
import { catalogoBeneficio } from '../../models/Pages/catalogoBeneficio.model';
import { UtilsService } from '../../services/utils/utils.service';
import { BeneficiosService } from '../../services/requests/beneficios.service';
import { Beneficio } from '../../models/Data/Beneficio';
import { catalogoBeneficioData } from '../../models/Pages/catalogoBeneficioData.model';
import { AbstractControl, FormControl } from '@angular/forms';


@Component({
  selector: 'list-cats',
  templateUrl: './list-cats.component.html',
  styleUrls: ['./list-cats.component.css']
})
export class ListCatsComponent implements OnInit {

  @Input() inputControl!: AbstractControl<any, any> | null;

  private catalogoService = inject(CatalogosService);
  private location = inject(Location);
  private planesService = inject(PlanesService);
  private utilsService = inject( UtilsService);
  private beneficioService = inject(BeneficiosService);
  loading = false;


  beneficios : Catalogo[] =[];
  planes : Plan[] = [];
  catalagoBeneficio : catalogoBeneficio[]= [];
  beneficioList : Beneficio[] = []
  beneficioData : catalogoBeneficioData[] = [];



  ngOnInit(): void {

    this.loading = true;
      this.catalogoService.getBeneficios().pipe(
          switchMap( data =>{
              this.beneficios = data.filter( catalogo => catalogo.status === 1 );
              // this.listBeneficiosCat = this.utilsService.mapListBeneficioCat(this.beneficios, this.beneficiosData);


              return this.planesService.getPlanes().pipe(
                catchError( (err)=> {
                  return throwError(err);
                })
              )
            }
          ),
          switchMap(
            data => {
              this.catalagoBeneficio =  this.utilsService.mapListBeneficio(data,this.beneficios);
              return  this.beneficioService.getBeneficios().pipe(
                catchError( (error) => {
                  return throwError(error);
                })
              )

            }
          )


      ).subscribe(
        {
          next : (data) => {
              this.loading = false
              this.beneficioList =data;
               this.beneficioData = this.utilsService.mapListBeneficioCat(data, this.beneficios);
               console.log(this.beneficioData);

          },

          error : (error) => {
            this.loading = false;
            this.showErrorMsg(error);
          }
        }

      )
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


  toggleBeneficio( beneficio : catalogoBeneficioData  ){
      const stateBeneficio : boolean = beneficio.subDropdownOpen;

      this.beneficioData.forEach(
        beneficio => beneficio.subDropdownOpen = false
      )

      beneficio.subDropdownOpen = stateBeneficio;

      this.changeFormControlValue(beneficio);


  }

  changeFormControlValue(beneficio : catalogoBeneficioData){
    if(beneficio.subDropdownOpen){
      this.inputControl?.setValue(beneficio.tipo_beneficio.catalogo_id);
    }
    else{
      this.inputControl?.setValue(null);
    }

  }

}
