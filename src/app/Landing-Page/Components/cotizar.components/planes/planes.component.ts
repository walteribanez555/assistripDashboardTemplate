import { Component,  ElementRef, ViewChild, HostListener, AfterViewInit, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, map, switchMap, Observable, Subscription } from 'rxjs';
import { Beneficio } from 'src/app/Shared/models/Data/Beneficio';
import { Catalogo } from 'src/app/Shared/models/Data/Catalogo';
import { Extra } from 'src/app/Shared/models/Data/Extra';
import { Plan } from 'src/app/Shared/models/Data/Plan';
import { Precio } from 'src/app/Shared/models/Data/Precio';
import { Servicio } from 'src/app/Shared/models/Data/Servicio';
import { catalogoBeneficio } from 'src/app/Shared/models/Pages/catalogoBeneficio.model';
import { catalogoBeneficioData } from 'src/app/Shared/models/Pages/catalogoBeneficioData.model';
import { cotizacionDataForm } from 'src/app/Shared/models/Pages/cotizacionDataForm.model';
import { ExtraForm } from 'src/app/Shared/models/Pages/extra.model';
import { FormCotizarModel } from 'src/app/Shared/models/Pages/formCotizar.model';
import { planDataForm } from 'src/app/Shared/models/Pages/planDataForm.model';
import { planbeneficio } from 'src/app/Shared/models/Pages/planbeneficio.model';
import { tipoBeneficio } from 'src/app/Shared/models/Pages/tipoBeneficio.model';
import { cotizacionIntefaceService } from 'src/app/Shared/services/interfaces/cotizacioninterface.service';
import { EventService } from 'src/app/Shared/services/interfaces/event.service';
import { BeneficiosService } from 'src/app/Shared/services/requests/beneficios.service';
import { CatalogosService } from 'src/app/Shared/services/requests/catalogos.service';
import { ExtrasService } from 'src/app/Shared/services/requests/extras.service';
import { PlanesService } from 'src/app/Shared/services/requests/planes.service';
import { PreciosService } from 'src/app/Shared/services/requests/precios.service';
import { ServiciosService } from 'src/app/Shared/services/requests/servicios.service';
import { UtilsService } from 'src/app/Shared/services/utils/utils.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements AfterViewInit,OnInit  {
  body : string = 'md';
  currentPage : number = 1;
  showCart : boolean = false;
  @ViewChild('topDiv', { static: true }) topDivRef!: ElementRef;
  isSticky : boolean = false;



  receivedData: FormCotizarModel= {
    initialDate: '',
    finalDate: '',
    tags: [],
    origen: '',
    listCotizaciones : [],
    email: '',
    telefono: '',

  };



  paises : Catalogo[] =[];
  beneficiosData: Catalogo[] = [];
  listadoPlanes : Servicio[] = [];
  planesCubren : Servicio[]= [];
  precios : Precio[] = [];
  extraList : Extra[]= [];
  beneficiosList : Plan[] = [];
  listPlanes : planDataForm[] = [];
  listDataBeneficios : tipoBeneficio[]= [];
  listadoPlanBeneficio : planbeneficio[] = [];
  listadoMenor: planbeneficio[] = [];
  listadoMayor : planbeneficio[] = [];
  listBeneficios : Beneficio[] = [];
  listBeneficiosCat : catalogoBeneficioData[] = [];
  listExtras : Extra[] = [];
  cardExtras : ExtraForm[] =[];
  minPlanes : number = 1;
  selectedPlans : number =0;



  servicioMayores : planbeneficio | null = null;
  servicioMenores : planbeneficio | null = null;


  listData: any[]= [];


  btn_pagar = false;



  isOld = false;
  diffDays : number = 0;
  listCotizaciones : cotizacionDataForm[] = [];
  cotizaciones : cotizacionDataForm[] = [];
  cotizacionesMayores : cotizacionDataForm[] = [];

  loading = false;



  detailsPlan : boolean = true;
  planMostrar : planbeneficio | null = null;

  private eventsSubscription?: Subscription;

  @Input() events?: Observable<void>;




  constructor(
    private elementRef: ElementRef,


    private dataService: cotizacionIntefaceService,
    //Servicios consumidos, para obtener los datos de la base de datos
    private catalogoService : CatalogosService,
    private servicios : ServiciosService,
    private extras : ExtrasService,
    private preciosService : PreciosService,
    private planesService : PlanesService,
    private beneficioService :BeneficiosService,
    private extraService  : ExtrasService,
    private utils : UtilsService,
    private router : Router,
    private eventService : EventService,

    ) {}

  ngOnInit(): void {
    this.loading = false;


    this.eventService.reloadPage$.subscribe(() => {
      // Realiza cualquier acción necesaria para recargar el componente "planes" aquí
      this.ngOnInit();
    });

    // Si hay informacion en la interfaz significa que se esta siguiendo un procedimiento
    if(this.dataService.sharedData.listCotizaciones.length === 0){
      Swal.close();
      this.router.navigateByUrl('/landing-page/home');
    }


    //Si hay la informacion se lo procede a guardar en este componente
    this.receivedData = this.dataService.sharedData;
    this.reemplazarData(this.receivedData);


    //Mapear los listados de beneficio por cada plan
     //obtiene y mapear los datos que se llegaran a usar
     this.servicios.getServicios().pipe(
      switchMap(data => {
        const listData = data.filter(item => item.status === 1);
        this.listadoPlanes= listData;
        return this.extras.getExtras();
      }),
      switchMap(data => {
        this.extraList = data;
        return this.preciosService.getPrecios();
      }),
      switchMap(data => {
        this.precios = data;

        return this.beneficioService.getBeneficios();
      }),
      switchMap(data=> {
        this.listBeneficios = data;

        return this.extraService.getExtras();

      }),

      switchMap(data => {
        this.listExtras = data;


        return this.catalogoService.getPaises();
      }),
      switchMap(data=> {
        this.paises = data.filter(item => item.status === 1);
        return this.catalogoService.getBeneficios();
      })
    ).subscribe(
      (data)=> {
          this.beneficiosData = data.filter(item => item.status === 1);
          this.listBeneficiosCat = this.mapListBeneficioCat(this.listBeneficios);


          //Se procede a hacer una consulta por cada plan
          const requests : any[]  = [];
          this.listadoPlanes.forEach(plan => {
            requests.push(plan.servicio_id);
          });

          //Convertir response a un listado con un nombre y su sub hijo
          forkJoin(
            requests.map((request) =>


              this.planesService.getPlanById(request).pipe(

                map((response) =>{

                  //Mostrar los extras que hay
                  this.cardExtras= this.showExtras()

                  //Se procede a mapear la informacion de los beneficios por plan

                  return ({
                    //Se procede a hacer la separacion de los planes y sus beneficios de acuerdo a si esos beneficios estan listados
                    serv :  this.listadoPlanes.find(plan => plan.servicio_id === request)? this.listadoPlanes.find(plan => plan.servicio_id === request) : null,
                    beneficios:  this.mapListBeneficio(response)
                  })
                } )
              )
            )
          ).subscribe(
            (response) => {

              this.listData = response;

              this.cotizar();
              // this.listadoPlanBeneficio = response;

              this.loading = true;

              if(this.cotizacionesMayores.length >0 && this.cotizaciones.length===0){
                this.isOld = true;
              }





            },
            (error) => {
              console.log(error);
            }

          );
      }


    );




  }




  //Mapear los listados de beneficio por cada plan
  mapListBeneficio(listPlan : Plan[]){

    const listCatBeneficio : catalogoBeneficio[] = [];
    this.beneficiosData.forEach(beneficio=> {
      const planesByBeneficio : Plan[] = listPlan.filter( plan => plan.tipo_beneficio === beneficio.valor);
      const catyBeneficio = {
        tipo_beneficio : beneficio,
        beneficios :  planesByBeneficio,
        isSubDropdownOpen: false,
      }
      listCatBeneficio.push(catyBeneficio);
    })

    return listCatBeneficio
   }


   //Mapear los listados de beneficios por cada categoria
   mapListBeneficioCat(listBeneficios : Beneficio[]){
      const listCatBeneficio : catalogoBeneficioData[] = [];
      this.beneficiosData.forEach(cat=> {
        const catbyBeneficio : Beneficio[] = listBeneficios.filter( beneficio => beneficio.tipo_beneficio === cat.valor);
        const catyBeneficio = {
          tipo_beneficio : cat,
          beneficios :  catbyBeneficio,
          subDropdownOpen: false,
        }

        listCatBeneficio.push(catyBeneficio);
      })

      return listCatBeneficio

   }

    //Reemplazar la informacion en local
  reemplazarData(data: FormCotizarModel){
    this.listCotizaciones = data.listCotizaciones;
    this.diffDays =this.utils.compararFechas(data.initialDate, data.finalDate);
  }

   cotizar(){
    this.minPlanes = 1;

    // this.planesCubren = this.listadoPlanes.filter(plan => this.utils.haveRequirements(plan, this.tags) );
    this.planesCubren = this.listadoPlanes.filter(plan =>  this.utils.haveRange(plan, this.diffDays, this.precios) );

    const {cotizacionesMayores, cotizacionesMenores, minPlanes } =this.utils.DivideByAge(this.listCotizaciones);
    this.cotizaciones = cotizacionesMenores;
    this.cotizacionesMayores = cotizacionesMayores;
    this.minPlanes = minPlanes;


    this.listadoPlanBeneficio = this.listData.filter(item => this.planesCubren.some(plan => plan.servicio_id === item.serv?.servicio_id)).map(
     item => {
       return {
         serv : item.serv? item.serv : null,
         beneficios : item.beneficios,
         isDropdownOpen: false,
         precio : this.utils.obtenerCostoPlan(this.precios, item.serv?.servicio_id, this.diffDays),
       }
     }
   );


   if(this.cotizaciones.length>0){

     this.listadoMenor = this.listadoPlanBeneficio.filter(plan => plan.serv && plan.serv?.edad_limite*1 === 75);
   }
   if(this.cotizacionesMayores.length>0){

     this.listadoMayor = this.listadoPlanBeneficio.filter(plan => plan.serv && plan.serv?.edad_base*1   === 75);
   }

  }

  //Listado de los extras que hay
  showExtras(): ExtraForm[]{
    const extrasFiltered : ExtraForm[] = this.listExtras.map((extra,index) => {
      return {
        id : index,
        extra,
        checked : false
      }
    });


    return extrasFiltered


  }


  ngAfterViewInit() {

    const cotizacionMain = document.getElementsByClassName('cotizacion-container');
    const rowTop = document.querySelector('.cotizacion-container .cotizacion .top');


    let stickyRowTop: number;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (rowTop && !rowTop.classList.contains('sticky')) {
            rowTop.classList.add('sticky');
            this.isSticky = true;
          }
        } else {
          if (rowTop && rowTop.classList.contains('sticky')) {
            rowTop.classList.remove('sticky');
            this.isSticky = false;
          }
        }
      });
    });



    cotizacionMain[0]?.addEventListener('scroll', () => {

      stickyRowTop = rowTop!.getBoundingClientRect().top + window.pageYOffset;
      if (cotizacionMain[0].scrollTop > stickyRowTop) {
        if (rowTop && !rowTop.classList.contains('sticky')) {
          rowTop.classList.add('sticky');
          this.isSticky = true;
        }
      } else {
        if (rowTop && cotizacionMain[0].scrollTop<100  && rowTop.classList.contains('sticky')) {
          rowTop.classList.remove('sticky');
          this.isSticky = false;
        }
      }
    });
  }








  // openModal(modalTemplate: TemplateRef<any>) {
    openModal() {
    this.showCart= true;
    // this.modalService
    //   .open(modalTemplate, { size: 'sm', title: 'Consulta los datos' })
    //   .subscribe((action) => {
    //     console.log('modalAction', action);
    //   });
  }

  changePage(page: number): void{
    this.currentPage = page;

  }

  closeCart(): void{
    this.showCart = false;
  }

  realizado(): void{
    this.showCart = false;
  }


  //Cambios en la vista, por manejo de usuario

  toggleListPlanBtn(state:  boolean){
    this.isOld = state;
  }

  toggleListPlan(servicio : planbeneficio)
  {

    if(servicio.serv?.edad_base===75){
        if(!this.servicioMayores){
          this.selectedPlans++
          this.servicioMayores = servicio;
          this.isOld = !this.isOld;

        }else{
          Swal.fire({
            title: '¿Estás seguro?',
            text: "Ya has seleccionado un plan para mayores de 75 años, si seleccionas otro se eliminará el anterior",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',

            confirmButtonText: 'Si, estoy seguro'
          }).then((result) => {
            if (result.isConfirmed) {
              this.servicioMayores = servicio;
              this.isOld = !this.isOld;
            }
          }
          )
        }





    }else{
      if(!this.servicioMenores){
        this.selectedPlans++
        this.servicioMenores = servicio;
      }else{
        Swal.fire({
          title: '¿Estás seguro?',
          text: "Ya has seleccionado un plan para menores de 75 años, si seleccionas otro se eliminará el anterior",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',

          confirmButtonText: 'Si, estoy seguro'
        }).then((result) => {
          if (result.isConfirmed) {
            this.servicioMenores = servicio;


          }
        }
        )
      }



    }


    if(this.minPlanes>1){
      if( this.servicioMayores && this.servicioMenores){
        this.btn_pagar = true;
      }

      if(this.servicioMenores) {
        this.isOld = !this.isOld;
      }

    }else{
      if(this.servicioMenores){
        this.btn_pagar = true;
      }

      if(this.servicioMayores){
        this.btn_pagar = true;

      }
    }

    if(this.selectedPlans === this.minPlanes){
        this.openModal();
    }



  }

  toggleDetails(plan :planbeneficio ){

    plan.isDropdownOpen = !plan.isDropdownOpen;

  }

  toggleBeneficioDetails(plan : planbeneficio, beneficio : catalogoBeneficio){

    const index = plan.beneficios.findIndex(b => b.tipo_beneficio.catalogo_id=== beneficio.tipo_beneficio.catalogo_id);
    if (index !== -1) {
      plan.beneficios[index].isSubDropdownOpen= !plan.beneficios[index].isSubDropdownOpen;
    }

  }


  showPlan(plan : planbeneficio){

    this.planMostrar = plan;
    this.detailsPlan = true;

  }

  closePlan(){
    this.detailsPlan = false;
  }



  siguiente(){
    this.showCart = false;
    if(this.minPlanes>1){
      if( this.servicioMayores && this.servicioMenores){
        this.guardarData();
        this.router.navigateByUrl('/landing-page/datos-polizas');
      }
      else{
        this.errorMessage("Falta elegir planes");
      }
   }else{
    if((this.servicioMenores && !this.servicioMayores) || (!this.servicioMenores && this.servicioMayores) ){
      this.guardarData();
      this.router.navigateByUrl('/landing-page/datos-polizas');
    }else{
      this.errorMessage("No ha seleccionado un plan");

    }
   }
  }

  guardarData(){
    if(this.servicioMenores?.serv){

      this.dataService.servicioMenores = this.servicioMenores?.serv;
    }
    if(this.servicioMayores?.serv){

      this.dataService.servicioMayores = this.servicioMayores?.serv;
    }

    this.dataService.cotizacionMayores = this.cotizacionesMayores;
    this.dataService.cotizacionMenores = this.cotizaciones;
    this.dataService.listExtras = this.cardExtras.filter(extra => extra.checked);

  }


  errorMessage(message : string){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }






}
