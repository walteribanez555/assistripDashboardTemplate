import { Component, ElementRef, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'headline',
  templateUrl: './modal-headline.component.html',
  styleUrls: ['./modal-headline.component.css']
})
export class ModalHeadlineComponent {

  loading : boolean = false;
  @Output() closeModal = new EventEmitter();
  @Input()  listPolizas : any[] = [];
  @Output() generateSold = new EventEmitter();


  constructor(
    private elementRef: ElementRef,

  ){
  }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeModal.emit()
  }

  onSelectPoliza( poliza : any){

    const polizaState : boolean = poliza.titular;

    this.listPolizas.forEach( poliza => {
      poliza.titular = false;
    })


    poliza.titular = polizaState;


  }


  toggleSold(){
    const polizas  = this.listPolizas.filter(poliza => poliza.titular);

    this.generateSold.emit(polizas);
  }
}
