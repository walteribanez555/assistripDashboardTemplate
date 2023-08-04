import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent implements OnInit {
  ngOnInit(): void {

    console.log("Por aqui pasa");
  }
  isDropDownOpen : boolean = false;

  clickToggle(){
    this.isDropDownOpen = !this.isDropDownOpen;
  }

}
