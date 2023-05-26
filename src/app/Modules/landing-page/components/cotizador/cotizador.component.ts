import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { cotizacionDataForm } from 'src/app/Modules/shared/models/Pages/cotizacionDataForm.model';
import { FormCotizarModel } from 'src/app/Modules/shared/models/Pages/formCotizar.model';
import { cotizacionIntefaceService } from 'src/app/Modules/shared/services/interfaces/cotizacioninterface.service';
import { UtilsService } from 'src/app/Modules/shared/services/utils/utils.service';

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




  ngOnInit(): void {

    //Si hay la informacion se lo procede a guardar en este componente
    this.receivedData = this.dataService.sharedData;



    //reemplaza los datos para los usos en este componente
    this.remplazarData(this.receivedData);

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


    this.reloadEvent.emit();



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

  onChangeInputDates(){
    this.diffDays = this.utils.compararFechas(this.formData.initialDate, this.formData.finalDate);
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
