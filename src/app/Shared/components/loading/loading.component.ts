import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  message: string = "Cargando la información..."


  ngOnInit(): void {

      setTimeout(() => {
        this.message = "Un momento mas..."
      }
      , 6000);
      setTimeout(() => {
        this.message = "Ya casi está..."
      }
      , 12000);
  }

}
