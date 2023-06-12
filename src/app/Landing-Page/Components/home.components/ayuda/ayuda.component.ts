import { Component } from '@angular/core';

@Component({
  selector: 'ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent {

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

  toggleInformation( event : any){
      event.isOpen = !event.isOpen;
    }


}
