import { Component } from '@angular/core';

@Component({
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  isDropDownOpen : boolean = false;

  clickToggle(){
    this.isDropDownOpen = !this.isDropDownOpen;
  }
}
