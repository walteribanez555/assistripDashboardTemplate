import { Component, Input } from '@angular/core';
import { catalogoBeneficio } from 'src/app/Modules/shared/models/Pages/catalogoBeneficio.model';

@Component({
  selector: 'sub-cat',
  templateUrl: './sub-cat.component.html',
  styleUrls: ['./sub-cat.component.css']
})
export class SubCatComponent {


  dropdownItems : boolean = false;
  @Input() typeBeneficio! : catalogoBeneficio;


  constructor() {}


  toggleDropdown(){
    this.dropdownItems = !this.dropdownItems;
  }

}
