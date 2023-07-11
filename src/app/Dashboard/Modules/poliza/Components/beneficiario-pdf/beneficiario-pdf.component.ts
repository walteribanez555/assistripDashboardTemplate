import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Beneficiario } from 'src/app/Shared/models/Data/Beneficiario';

@Component({
  selector: 'beneficiario-pdf',
  templateUrl: './beneficiario-pdf.component.html',
  styleUrls: ['./beneficiario-pdf.component.css']
})
export class BeneficiarioPdfComponent {

  @Input() beneficiario! : Beneficiario

  @Output() onSelect = new EventEmitter();



  toggleBtn(){
    this.onSelect.emit(this.beneficiario.beneficiario_id);

  }
}
