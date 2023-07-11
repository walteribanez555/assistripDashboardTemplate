import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-div',
  templateUrl: './loading-div.component.html',
  styleUrls: ['./loading-div.component.css']
})
export class LoadingDivComponent {

  @Input() message : string = "Cargando la informacion"

}
