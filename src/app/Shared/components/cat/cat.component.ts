import { Component,  Input, OnInit} from '@angular/core';


import { Beneficio } from '../../models/Data/Beneficio';


@Component({
  selector: 'cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {

  @Input() beneficios : Beneficio[] = [];


  ngOnInit(): void {

  }



}


