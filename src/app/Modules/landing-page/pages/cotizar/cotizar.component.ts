import { Component, OnInit, ViewChild, ElementRef , AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Beneficio } from 'src/app/Modules/shared/models/Data/Beneficio';
import { Catalogo } from 'src/app/Modules/shared/models/Data/Catalogo';
import { Extra } from 'src/app/Modules/shared/models/Data/Extra';
import { Plan } from 'src/app/Modules/shared/models/Data/Plan';
import { Precio } from 'src/app/Modules/shared/models/Data/Precio';
import { Servicio } from 'src/app/Modules/shared/models/Data/Servicio';
import { catalogoBeneficio } from 'src/app/Modules/shared/models/Pages/catalogoBeneficio.model';
import { catalogoBeneficioData } from 'src/app/Modules/shared/models/Pages/catalogoBeneficioData.model';
import { cotizacionDataForm } from 'src/app/Modules/shared/models/Pages/cotizacionDataForm.model';
import { ExtraForm } from 'src/app/Modules/shared/models/Pages/extra.model';
import { FormCotizarModel } from 'src/app/Modules/shared/models/Pages/formCotizar.model';
import { planDataForm } from 'src/app/Modules/shared/models/Pages/planDataForm.model';
import { planbeneficio } from 'src/app/Modules/shared/models/Pages/planbeneficio.model';
import { tipoBeneficio } from 'src/app/Modules/shared/models/Pages/tipoBeneficio.model';
import { cotizacionIntefaceService } from 'src/app/Modules/shared/services/interfaces/cotizacioninterface.service';
import { BeneficiosService } from 'src/app/Modules/shared/services/requests/beneficios.service';
import { CatalogosService } from 'src/app/Modules/shared/services/requests/catalogos.service';
import { ExtrasService } from 'src/app/Modules/shared/services/requests/extras.service';
import { PlanesService } from 'src/app/Modules/shared/services/requests/planes.service';
import { PreciosService } from 'src/app/Modules/shared/services/requests/precios.service';
import { ServiciosService } from 'src/app/Modules/shared/services/requests/servicios.service';
import { UtilsService } from 'src/app/Modules/shared/services/utils/utils.service';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})
export class CotizarComponent implements OnInit, AfterViewInit{

    tags: string[] = [];


    listTags : string = "";

    ageListShow = false;
    inputValue: string ="";
    listCotizaciones : cotizacionDataForm[] = [];

    cotizaciones : cotizacionDataForm[] = [];
    cotizacionesMayores : cotizacionDataForm[] = [];




  receivedData: FormCotizarModel= {
    initialDate: '',
    finalDate: '',
    tags: [],
    origen: '',
    listCotizaciones : [],
    email: '',
    telefono: '',

  };

  formData = {
    initialDate: '25/05/2002',
    finalDate: '',
    inputValue : '',
    origen : '',
    email : '',
    telefono : '',

  };


  public itemHeight = 150;
  nextId : number = 0;
  isOld = false;

  diffDays : number = 0;


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



  servicioMayores : Servicio | null = null;
  servicioMenores : Servicio | null = null;


  listData: any[]= [];


  btn_pagar = false;
  isSticky = false;


  @ViewChild('rowTop') rowTopElementRef?: ElementRef;
  stickyRowTop: number | undefined;


  ngAfterViewInit() {
    const cotizacionMain = document.getElementsByClassName('cotizacionMain');
    const rowTop = document.querySelector('.cotizacionMain .row.top');
    const alert = document.querySelector('.alert');
    const btn_age = document.querySelector('.btn-age');

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

    if (btn_age && alert) {
      observer.observe(btn_age);
      observer.observe(alert);
    } else if (btn_age && !alert) {
      observer.observe(btn_age);
    }

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

  stateBottom : 1| 2 | 3 = 1;


  constructor(
    //interfaz para los datos del cliente
      private dataService: cotizacionIntefaceService,
    //Para navegar entre las rutas
      private router : Router,
    //Servicios consumidos, para obtener los datos de la base de datos
      private catalogoService : CatalogosService,
      private servicios : ServiciosService,
      private extras : ExtrasService,
      private preciosService : PreciosService,
      private planesService : PlanesService,
      private beneficioService :BeneficiosService,
      private extraService  : ExtrasService,
      private utils : UtilsService,
    ) {}

  ngOnInit() {


    //Mostrar la pantalla de carga
    this.loadInitialMessage();


    // Si hay informacion en la interfaz significa que se esta siguiendo un procedimiento
    // if(this.dataService.sharedData.listCotizaciones.length === 0){
    //   Swal.close();
    //   console.log("No recibo informacion");
    //   this.router.navigate(['../../home]']);
    // }

    //Si hay la informacion se lo procede a guardar en este componente
    this.receivedData = this.dataService.sharedData;



    //reemplaza los datos para los usos en este componente
    this.remplazarData(this.receivedData);


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


              Swal.close();

            },
            (error) => {
              Swal.close();
              this.errorMessage();
              console.error(error);
            }

          );
      }


    );

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


  //Cuando se modifican los inputs de las fechas
  onChangeInputDates(){
    this.diffDays = this.utils.compararFechas(this.formData.initialDate, this.formData.finalDate);
  }

  //Reemplazar la informacion en local
  remplazarData(data: FormCotizarModel){
    this.formData.initialDate = data.initialDate;
    this.formData.finalDate = data.finalDate;
    this.formData.origen = data.origen;
    this.formData.email = data.email;
    this.formData.telefono = data.telefono;
    this.tags = data.tags;
    this.listCotizaciones = data.listCotizaciones;
    this.listTags = this.tags.join(', ');
    this.diffDays =this.utils.compararFechas(data.initialDate, data.finalDate);
    this.nextId = this.listCotizaciones.length;
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


   //Volver a la ruta de home
  salir(){
    this.router.navigate(['/home']);
  }


  //Al cambiar la edad de un input de las edades
  changeAgeInpt(event: any, item: cotizacionDataForm) {

    const index = this.listCotizaciones.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.listCotizaciones[index].age = event.target.value;

    }


  }


  //Volver a la ruta de home
  backHome(){
    const data: FormCotizarModel = {
      initialDate : this.formData.initialDate,
      finalDate : this.formData.finalDate,
      origen : this.formData.origen,
      email : this.formData.email,
      telefono : this.formData.telefono,
      tags : this.tags,
      listCotizaciones : this.listCotizaciones
    }
    this.dataService.sharedData= data;
    this.router.navigate(['/home']);
  }

  //Para realizar la cotizacion nuevamente
   btnCotizar(){
    this.showEvent('Cotizando', 'Espere un momento por favor');
    this.cotizar();

    Swal.close();
   }

   //Mostrar un mensaje informativo
   showEvent( title: string ,descEvent : string){
    Swal.fire({
      title,
      text: descEvent,
      icon: 'info',
      allowOutsideClick: false
    });
   }

   //Realizar los procedimientos de cotizacion
   cotizar(){
     this.minPlanes = 1;

     this.planesCubren = this.listadoPlanes.filter(plan => this.utils.haveRequirements(plan, this.tags) );
     this.planesCubren = this.planesCubren.filter(plan =>  this.utils.haveRange(plan, this.diffDays, this.precios) );

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
          precio : 1
        }
      }
    );


    this.listadoMayor = this.listadoPlanBeneficio.filter(plan => plan.serv && plan.serv?.edad_base=== 75);
    this.listadoMenor = this.listadoPlanBeneficio.filter(plan => plan.serv && plan.serv?.edad_limite=== 75);

   }


   //Volver a cargar la vista con la informacion actualizada
   reloadView(){
    const cotizarForm : FormCotizarModel = {
      initialDate: this.formData.initialDate,
      finalDate: this.formData.finalDate,
      origen : this.formData.origen,
      email : this.formData.email,
      telefono : this.formData.telefono,
      listCotizaciones : this.listCotizaciones,
      tags : this.tags
    }


    this.dataService.sharedData = cotizarForm;

    this.ngOnInit();

   }


   //Proceder a la siguiente parte del formulario
   siguiente(){
    if(this.minPlanes>1){
      if( this.servicioMayores && this.servicioMenores){
        this.guardarData();
        this.router.navigate(['../../home/datos-polizas']);
      }
      else{
        console.log("No pasa, faltan el adulto mayor");
      }
   }else{
    if(this.servicioMenores){
      this.guardarData();
      this.router.navigate(['../../home/datos-polizas']);
    }else{
      console.log("No pasa, faltan los menores");
    }
   }
  }

  //Guardar la informacion en la interfaz de datos

  guardarData(){
    this.dataService.servicioMayores = this.servicioMayores;
    this.dataService.servicioMenores = this.servicioMenores;

    this.dataService.cotizacionMayores = this.cotizacionesMayores;
    this.dataService.cotizacionMenores = this.cotizaciones;
    this.dataService.listExtras = this.cardExtras.filter(extra => extra.checked);

  }

  //Mensajes de carga y error

  errorMessage(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }


  loadInitialMessage(){
    Swal.fire({

      text: 'Espere un momento mientras se procesa la informacion',
      imageUrl: 'https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif',

      showConfirmButton : false,
      allowOutsideClick: false,

      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }


  //Cambios en la vista, por manejo de usuario

  toggleListPlanBtn(state:  boolean){
    this.isOld = state;
  }

  toggleListPlan(servicio : Servicio)
  {

    if(servicio.edad_base===75){
        if(this.minPlanes>1){
          this.servicioMayores = servicio;
        }
    }else{
      this.servicioMenores = servicio;
    }


    if(this.minPlanes>1){
      if( this.servicioMayores && this.servicioMenores){
        this.btn_pagar = true;
      }
    }else{
      if(this.servicioMenores){
        this.btn_pagar = true;
      }
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


  remove(tag: string) {
    let index = this.tags.indexOf(tag);
    this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];

    this.listTags = this.tags.join(', ');
  }

  addTag(event: any) {
    if (event.key === 'Enter') {
      let tag = event.target.value.replace(/\s+/g, ' ');
      this.insertTag(tag);
      event.target.value = '';
    }



  }

  insertTag(tag: string) {
    if(tag!=="pais"){

      if (tag.length > 1 && !this.tags.includes(tag)) {

          tag.split(',').forEach(tag => {
            this.tags.push(tag);
          });

      }

      this.listTags = this.tags.join(', ');
      console.log(this.listTags);
    }
  }

  onSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      if (target.value === 'pais') {
        return;
      }
      const selectedValue = target.value;
      this.insertTag(selectedValue);

      target.value = "pais";
      this.formData.inputValue = 'pais';





      // Do something with the selected value here
    }

  }

  toggleListAge(){
    this.ageListShow = !this.ageListShow;
  }


  addItem(){

    const cotizacionfrm : cotizacionDataForm ={
      id :this.nextId++,
      age: 0,
      item : this.utils.createItemForm()
    }

    this.listCotizaciones.push(cotizacionfrm);

  }

  deleteItem(item: cotizacionDataForm) {
    const index = this.listCotizaciones.findIndex(i => i.id === item.id);
    if (index !== -1) {

      this.listCotizaciones.splice(index, 1);
    }
  }


  toggleExtra( extra  : ExtraForm ){
    extra.checked = !extra.checked;
  }



}
