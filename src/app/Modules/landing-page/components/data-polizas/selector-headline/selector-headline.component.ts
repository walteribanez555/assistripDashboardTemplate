import { Component, Input , Output } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'selector-headline',
  templateUrl: './selector-headline.component.html',
  styleUrls: ['./selector-headline.component.css']
})
export class SelectorHeadlineComponent {


  @Input() title : string = 'tipo'
  @Input() validations : ValidationErrors | null= null;
  @Input() value? = '';






}
