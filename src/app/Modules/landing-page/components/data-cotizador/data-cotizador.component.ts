import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Catalogo } from 'src/app/Modules/shared/models/Data/Catalogo';
import { cotizacionDataForm } from 'src/app/Modules/shared/models/Pages/cotizacionDataForm.model';
import { datesDestiny } from 'src/app/Modules/shared/models/Pages/datesDestiny.model';
import { FormCotizarModel } from 'src/app/Modules/shared/models/Pages/formCotizar.model';
import { cotizacionIntefaceService } from 'src/app/Modules/shared/services/interfaces/cotizacioninterface.service';
import { CatalogosService } from 'src/app/Modules/shared/services/requests/catalogos.service';
import { UtilsService } from 'src/app/Modules/shared/services/utils/utils.service';


@Component({
  selector: 'app-data-cotizador',
  templateUrl: './data-cotizador.component.html',
  styleUrls: ['./data-cotizador.component.css']
})
export class DataCotizadorComponent implements OnInit {

  tags: string[] = [];
  paises : Catalogo[] =[];
  inputValue: string ="";
  listCotizaciones : cotizacionDataForm[] = [];
  seeAges: boolean = true;
  

  nextId : number = 0;

  formData = {
    initialDate: '',
    finalDate: '',
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

  
  diffDays = -1;
  minDate: string = "";
  maxDate : string = "";
  firstDate : string = "";



  constructor(
    private catalogoService : CatalogosService,
    private router : Router,
    private dataService: cotizacionIntefaceService,
    private utils : UtilsService
  ){
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.firstDate = this.minDate;
  }
  

  ngOnInit(): void {

    this.catalogoService.getPaises().subscribe(
      (data)=> {  
        this.paises = data.filter(item => item.status === 1);
      });


      this.receivedData = this.dataService.sharedData;

      this.remplazarData(this.receivedData);


      if(this.listCotizaciones.length === 0){
        this.addItem();
      }
      
      

  }


  remplazarData(data: FormCotizarModel){
    this.formData.initialDate = data.initialDate;
    this.formData.finalDate = data.finalDate;
    this.formData.origen = data.origen;
    this.formData.email = data.email;
    this.formData.telefono = data.telefono;
    this.tags = data.tags;
    this.listCotizaciones = data.listCotizaciones;
    this.nextId = this.listCotizaciones.length;
    this.comparar();
  }
  

  comparar(){
    const date1: Date = new Date(this.formData.initialDate);
    const date2: Date = new Date(this.formData.finalDate);


    console.log(this.formData.initialDate);
    if( !(this.formData.finalDate === "") ){
      this.maxDate = this.formData.finalDate;
    }
    if( !(this.formData.initialDate === "") ){
      this.firstDate = this.formData.initialDate;
    }
    


    
  
      // Get the difference in milliseconds
      const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  
      // Convert the difference to days
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
      if(!isNaN(diffInDays)){
        this.diffDays= diffInDays+1;
      }
   }
  
   //Remover del listado de tags
    remove(tag: string) {
      let index = this.tags.indexOf(tag);
      this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];

      const data : datesDestiny = { 
        initialDate : this.formData.initialDate,
        finalDate : this.formData.finalDate,
        tags : this.tags}
      // this.modifyTags.emit(data);
      
    }
  

    //Agregar un tag al listado
    addTag(event: any) {
      if (event.key === 'Enter') {
        let tag = event.target.value.replace(/\s+/g, ' ');
        this.insertTag(tag);
        event.target.value = '';
      }
    }
  

    //Proceder a agregar en la lista de tags
    insertTag(tag: string) {
      if(tag!=="pais"){
  
        if (tag.length > 1 && !this.tags.includes(tag)) {
          
            tag.split(',').forEach(tag => {
              this.tags.push(tag);
            });
          
        }
      }
    }

    //Al momento de seleccionar un pais, confirma de que no sea el primero
    onSelect(event: Event) {
      const target = event.target as HTMLSelectElement;
      if (target) {
        const selectedValue = target.value;
        this.insertTag(selectedValue);
        target.value = "pais";
      }
    
    }
  

    comprobarFecha( fecha : string): boolean{

      const timestamp = Date.parse(fecha);

      if (isNaN(timestamp)) {
        return false
      } else {
        return true
      }

    }

    addItem(){
      
      const cotizacionfrm : cotizacionDataForm ={ 
        id :this.nextId++,
        age: null,
        item : this.utils.createItemForm()
      }

      


      this.listCotizaciones.push(cotizacionfrm);

    }

    agregar(event : any){

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
      
      this.router.navigate(['../../home/cotizar']);
    }


    deleteItem(item: cotizacionDataForm) {
      const index = this.listCotizaciones.findIndex(i => i.id === item.id);
      if (index !== -1) {
        
        this.listCotizaciones.splice(index, 1);
      }
    }

    changeAgeInpt(event: any, item: cotizacionDataForm) {
      
      const index = this.listCotizaciones.findIndex(i => i.id === item.id);
      ;
      if (index !== -1) {
        this.listCotizaciones[index].age = event.target.value;
        
      }

      
    }

    seeDetails(){
      this.seeAges = !this.seeAges;
    }

}
