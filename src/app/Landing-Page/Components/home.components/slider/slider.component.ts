import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
import { interval } from 'rxjs';
import { Slide } from 'src/app/Landing-Page/models/slides';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    trigger('scrollAnimation', [
      transition('* => *', [
        style({ transform: 'translateX(0)' }),
        animate(
          '5s ease-in-out',
          style({ transform: 'translateX(-54.8%)' }),


        ),

      ]),
    ]),
  ],
})
export class SliderComponent implements OnInit {

  scrollState = 0;

  constructor() {}

  ngOnInit() {

  }

  scrollToNext() {
    if (this.scrollState < this.slides.length - 1) {
      this.scrollState++;
    } else {
      this.scrollState = 0; // Reset to the start
    }
  }


  slides: Slide[] = [
    {
      url: 'assets/images/3.jpg',
      title: 'Cobertura Covid-19',
      description: 'Asegura tu salud con nuestra cobertura especializada para situaciones relacionadas con el Covid-19.'
    },
    {
      url: 'assets/images/mascotas.jpg',
      title: 'Protección para Mascotas',
      description: 'Protege a tus queridas mascotas con nuestra cobertura de mascotas, que cubre accidentes.'
    },
    {
      url: 'assets/images/deportes.jpg',
      title: 'Deportes Amateur',
      description: 'Disfruta de tus actividades deportivas favoritas con la seguridad de estar protegido en caso de lesiones.'
    },
    {
      url: 'assets/images/equipaje.jpg',
      title: 'Pérdida de Equipaje',
      description: 'Viaja tranquilo sabiendo que estamos aquí para ayudarte en caso de pérdida de equipaje durante tus viajes.'
    },
    {
      url: 'assets/images/perdidaviaje.jpg',
      title: 'Retraso de Vuelo',
      description: 'Evita preocupaciones por retrasos en tus vuelos con nuestra cobertura que compensa los inconvenientes.'
    },

  ];

}
