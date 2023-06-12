import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { ExpandDown } from 'src/app/Shared/animations/expandDown.animation';

@Component({
  selector: 'poliza-modal',
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.css'],
  animations : [
    ExpandDown

  ]
})
export class PolizaModalComponent  {

  displayDetails : boolean = false;

  @Input() poliza : any


  @Output() isCheckedChange  = new EventEmitter<any>()






  toggleDetails(){
    this.displayDetails = !this.displayDetails;
  }


  toggleCheck(){

    this.isCheckedChange.emit(this.poliza);
  }

}
