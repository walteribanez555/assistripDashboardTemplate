import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Catalogo } from 'src/app/models/Data/Catalogo';
import { CatalogosService } from 'src/app/services/catalogos.service';


@Component({
  selector: 'app-form-dates-destination',
  templateUrl: './form-dates-destination.component.html',
  styleUrls: ['./form-dates-destination.component.css']
})
export class FormDatesDestinationComponent implements OnInit {

  @Input() countries: Catalogo[];


  formData = {
    initialDate: '',
    finalDate: '',
    
  };

  tags: string[] = [];
  diffDays = -1;
  paises : Catalogo[] =[];
  
  @ViewChild('tagInput') tagInput?: ElementRef;
  @ViewChild('tagList') tagList?: ElementRef;
  @ViewChild('tagNumber') tagNumber!: ElementRef;


  constructor(
    
    private catalogoService : CatalogosService

  ){
    this.countries = [];
  }

  ngOnInit(): void {
    
    // this.catalogoService.getPaises().subscribe(
    //   (data)=> {
    //     this.paises = data.filter(item => item.status === 1);
    //   })


  }


  comparar(){
    const date1: Date = new Date(this.formData.initialDate);
    const date2: Date = new Date(this.formData.finalDate);
  
      // Get the difference in milliseconds
      const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  
      // Convert the difference to days
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
      if(!isNaN(diffInDays)){
        this.diffDays= diffInDays;
      }
   }
  
   
    
  
    
    
  
    remove(tag: string) {
      let index = this.tags.indexOf(tag);
      this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];
      
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
          if (this.tags.length < 20) {
            tag.split(',').forEach(tag => {
              this.tags.push(tag);
            });
          }
        }
      }
    }
  
  
    
  
    onSelect(event: Event) {
      const target = event.target as HTMLSelectElement;
      if (target) {
        const selectedValue = target.value;
        this.insertTag(selectedValue);
        // Do something with the selected value here
      }
    }
  

    agregar(){
      console.log(this.formData);
    }
  
  

}