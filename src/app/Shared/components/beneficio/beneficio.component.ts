import { Component, EventEmitter, Input, Output } from '@angular/core';
import { catalogoBeneficioData } from '../../models/Pages/catalogoBeneficioData.model';

@Component({
  selector: 'beneficio',
  templateUrl: './beneficio.component.html',
  styleUrls: ['./beneficio.component.css']
})
export class BeneficioComponent {

  @Input() beneficio! : catalogoBeneficioData;
  @Output() toggleBeneficio  = new EventEmitter<any>()


  changeEvent( ){
    this.toggleBeneficio.emit(this.beneficio);
  }

}
