import { Component, Input } from '@angular/core';
import { Poliza } from 'src/app/Shared/models/Data/Poliza';

@Component({
  selector: 'poliza-data',
  templateUrl: './poliza-data.component.html',
  styleUrls: ['./poliza-data.component.css']
})
export class PolizaDataComponent {

  @Input() poliza ! : Poliza;



}
