import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  listDataInformation : any[] = [
    {
    title: '¿Qué es un seguro de viaje?',
    description: 'Es un seguro que te protege ante cualquier imprevisto que pueda suceder durante tu viaje. Es una forma de proteger tu salud y tu bolsillo ante cualquier imprevisto que pueda suceder durante tu viaje. Es una forma de proteger tu salud y tu bolsillo ante cualquier imprevisto que pueda suceder durante tu viaje.',
    isOpen :true,
    },
    {
      title: '¿Como funciona?',
      description: 'Es un seguro que te protege ante cualquier imprevisto que pueda suceder durante tu viaje. Es una forma de proteger tu salud y tu bolsillo ante cualquier imprevisto que pueda suceder durante tu viaje. Es una forma de proteger tu salud y tu bolsillo ante cualquier imprevisto que pueda suceder durante tu viaje.',
      isOpen :true,

    },
    {
      title: '¿Qué cubre un seguro de viaje?',
      description: 'Es un seguro que te protege ante cualquier imprevisto que pueda suceder durante tu viaje. Es una forma de proteger tu salud y tu bolsillo ante cualquier imprevisto que pueda suceder durante tu viaje. Es una forma de proteger tu salud y tu bolsillo ante cualquier imprevisto que pueda suceder durante tu viaje.',
      isOpen :true,

    },
    {
      title: '¿Cubre en un acto de guerra?',
      description: 'Es un seguro que te protege ante cualquier imprevisto que pueda suceder durante tu viaje. Es una forma de proteger tu salud y tu bolsillo ante cualquier imprevisto que pueda suceder durante tu viaje. Es una forma de proteger tu salud y tu bolsillo ante cualquier imprevisto que pueda suceder durante tu viaje.',
      isOpen :true,

    },

]

  constructor(
    private router : Router,

  ) {}


  slider_translate = 0;

  

  ngOnInit(): void {
    interval(3000).subscribe(() => {
      this.sliderRight();
    });
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


  setSliderTranslate( position : number){
    this.slider_translate= position;
  }


  about_us(){
    this.router.navigate(['/about-us']);
  }


  toggleInformation( event : any){
    event.isOpen = !event.isOpen;
  }

  help(){
    this.router.navigate(['/help']);
  }
  

}
