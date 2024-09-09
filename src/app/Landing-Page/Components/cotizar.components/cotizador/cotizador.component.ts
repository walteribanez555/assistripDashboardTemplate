import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Catalogo } from 'src/app/Shared/models/Data/Catalogo';
import { cotizacionDataForm } from 'src/app/Shared/models/Pages/cotizacionDataForm.model';
import { FormCotizarModel } from 'src/app/Shared/models/Pages/formCotizar.model';
import { cotizacionIntefaceService } from 'src/app/Shared/services/interfaces/cotizacioninterface.service';
import { EventService } from 'src/app/Shared/services/interfaces/event.service';
import { CatalogosService } from 'src/app/Shared/services/requests/catalogos.service';
import { UtilsService } from 'src/app/Shared/services/utils/utils.service';


export enum typeCotizacion{
  menor = 1,
  mayor = 2,
  restarMenor =3,
  restarMayor =4,
}



@Component({
  selector: 'cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent implements OnInit {

  @Output() reloadEvent = new EventEmitter();


  constructor( //interfaz para los datos del cliente
  private dataService: cotizacionIntefaceService,
//Para navegar entre las rutas
  private router : Router,
//Servicios consumidos, para obtener los datos de la base de datos
  private utils : UtilsService,

  private eventService  : EventService,

  private catalogoService : CatalogosService,
  ){

  }


  formData = {
    initialDate: '25/05/2002',
    finalDate: '',
    inputValue : '',
    origen : '',
    email : '',
    telefono : '',

  };

  receivedData: FormCotizarModel= {
    initialDate: '',
    finalDate: '',
    tags: [],
    origen: '',
    listCotizaciones : [],
    email: '',
    telefono: '',

  };

  tags: string[] = [];

  listCotizaciones : cotizacionDataForm[] = [];

  nextId : number = 0;

  listTags : string = "";

  diffDays : number = 0;

  ageListShow = false;

  cantMenores= 0;
  cantMayores= 0;

  minDate: string = "";
  maxDate : string = "";
  firstDate : string = "";
  limitDate : string = "";

  paises : Catalogo[] =[];




  ngOnInit(): void {

    //Si hay la informacion se lo procede a guardar en este componente
    this.receivedData = this.dataService.sharedData;

    this.catalogoService.getPaises().subscribe(
      (data)=> {
        this.paises = data.filter(item => item.status === 1);
      });




    //reemplaza los datos para los usos en este componente
    this.remplazarData(this.receivedData);

    this.comparar();

  }


  //Volver a cargar la vista con la informacion actualizada
  reloadView(){

    if(this.cantMenores > 0 && this.cantMayores >0){


      return;
    }


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

    this.eventService.reloadPage();

   }


     //Reemplazar la informacion en local
  remplazarData(data: FormCotizarModel){
    this.formData.initialDate = data.initialDate;
    this.formData.finalDate = data.finalDate;
    this.formData.origen = data.origen;
    this.formData.email = data.email;
    this.formData.telefono = data.telefono ? data.telefono : '';
    this.tags = data.tags;
    this.listCotizaciones = data.listCotizaciones;
    this.obtenerListados(data.listCotizaciones);

    this.listTags = this.tags.join(', ');
    if (this.listTags.length > 28) {
      this.listTags = this.listTags.substring(0, 28) + '...';
    }

    this.diffDays =this.utils.compararFechas(data.initialDate, data.finalDate);
    this.nextId = this.listCotizaciones.length;
  }


  obtenerListados(listado : cotizacionDataForm[]){

    this.cantMenores = listado.filter(cotizacion => cotizacion.age && cotizacion.age<75).length
    this.cantMayores = listado.filter(cotizacion => cotizacion.age && cotizacion.age>=75).length



   }

  agregarCotizado( type : number){

    switch (type) {

      case typeCotizacion.mayor:
          this.addItem(75);
          this.cantMayores++
        break;

      case typeCotizacion.menor:
          this.addItem(25);
          this.cantMenores++
        break;
      case typeCotizacion.restarMayor:
          this.deleteItemByAge(75)
        break;
      case typeCotizacion.restarMenor:
          this.deleteItemByAge(25);
        break

    }



 }


 deleteItemByAge( age : number){
  const index = this.listCotizaciones.findIndex(i => i.age=== age)

  if(index !== -1){
    this.listCotizaciones.splice(index, 1);

    if(age < 75){
      this.cantMenores --
    }

    if(age >= 75){
      this.cantMayores --
    }

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
          this.tags= [tag];
        });

    }


      this.listTags = this.tags.join(', ');
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


  addItem( edad = 10 ){

    const cotizacionfrm : cotizacionDataForm ={
      id :this.nextId++,
      age: edad,
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

  onChangeInputDates(){
    this.diffDays = this.utils.compararFechas(this.formData.initialDate, this.formData.finalDate);

    const date1: Date = new Date(this.formData.initialDate);
    const date2: Date = new Date(this.formData.finalDate);


    const inputDate = new Date(this.firstDate);

      // Add 365 days to the input date
      const resultDate = new Date(inputDate.getTime());
      resultDate.setDate(resultDate.getDate() + 365);



      // Convert the result back to a string in the "yyyy-mm-dd" format
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
      const resultDateString = resultDate.toLocaleDateString("en-GB", options).split('/').reverse().join('-');

      this.limitDate = resultDateString;





      // Get the difference in milliseconds
      const diffInMs = Math.abs(date2.getTime() - date1.getTime());

      // Convert the difference to days
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if(!isNaN(diffInDays)){
        this.diffDays= diffInDays+1;
      }


      if(diffInDays>365){
        this.formData.finalDate = "";
        this.diffDays = 0;
      }
  }

  comparar(){
    const date1: Date = new Date(this.formData.initialDate);
    const date2: Date = new Date(this.formData.finalDate);


    if( !(this.formData.finalDate === "") ){
      this.maxDate = this.formData.finalDate;
    }
    if( !(this.formData.initialDate === "") ){



      this.firstDate = this.formData.initialDate;


    }


    const inputDate = new Date(this.firstDate);

      // Add 365 days to the input date
      const resultDate = new Date(inputDate.getTime());
      resultDate.setDate(resultDate.getDate() + 365);



      // Convert the result back to a string in the "yyyy-mm-dd" format
      const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
      const resultDateString = resultDate.toLocaleDateString("en-GB", options).split('/').reverse().join('-');

      this.limitDate = resultDateString;





      // Get the difference in milliseconds
      const diffInMs = Math.abs(date2.getTime() - date1.getTime());

      // Convert the difference to days
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if(!isNaN(diffInDays)){
        this.diffDays= diffInDays+1;
      }


      if(diffInDays>365){
        this.formData.finalDate = "";
        this.diffDays = 0;
      }
   }

  changeAgeInpt(event: any, item: cotizacionDataForm) {

    const index = this.listCotizaciones.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.listCotizaciones[index].age = event.target.value;

    }


  }

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


}
