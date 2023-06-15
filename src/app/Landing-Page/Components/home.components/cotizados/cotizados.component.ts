import { Component, Output,Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'cotizados',
  templateUrl: './cotizados.component.html',
  styleUrls: ['./cotizados.component.css']
})
export class CotizadosComponent {


  @Input() cantMenores : number =0;
  @Input() cantMayores : number =0;

  @Output() addItem = new EventEmitter<number>();





  plusMenores(cantidad : number) {
    if(this.cantMenores<=0 && cantidad==3){
      return
    }

    this.addItem.emit(cantidad);
    return
  }

  plusMayores(cantidad : number) {
    if(this.cantMayores<=0 && cantidad==4){
      return
    }


    this.addItem.emit(cantidad);
    return


  }


}
