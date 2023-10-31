import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'img-slider',
  templateUrl: './img-slider.component.html',
  styleUrls: ['./img-slider.component.css']
})
export class ImgSliderComponent implements OnInit {


  slider_translate = 0;

  ngOnInit(): void {
    interval(3000).subscribe(() => {
      this.sliderRight();
    });
  }

  setSliderTranslate( position : number){
    this.slider_translate= position;
  }


  sliderLeft(){
    if(this.slider_translate === 0){
      return;
    }
    this.slider_translate += 25;
    return;
  }

  sliderRight(){
    if(this.slider_translate=== -75 ){
      this.slider_translate = 0;
      return;
    }
    this.slider_translate -= 25;
    return;
  }

}
