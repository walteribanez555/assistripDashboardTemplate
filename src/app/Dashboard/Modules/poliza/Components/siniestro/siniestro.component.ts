import { Component, Input, OnInit } from '@angular/core';
import { Beneficiario } from 'src/app/Shared/models/Data/Beneficiario';
import { Siniestro } from 'src/app/Shared/models/Data/Siniestro';

@Component({
  selector: 'siniestro',
  templateUrl: './siniestro.component.html',
  styleUrls: ['./siniestro.component.css']
})
export class SiniestroComponent implements OnInit {

  @Input() siniestro! : Siniestro;
  @Input() beneficiarios : Beneficiario[] = [];


  beneficiario : Beneficiario | null = null;

  ngOnInit(): void {
      this.beneficiario = this.beneficiarios.filter( beneficiario => this.siniestro.beneficiario_id === beneficiario.beneficiario_id)[0];
    }




}
