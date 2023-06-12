import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '.top[appScrollVisibility]'
})
export class ScrollVisibilityDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('window:scroll')
  onScroll() {
    const element = this.elementRef.nativeElement;
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight) {
      // El elemento ya no es visible en la pantalla, puedes realizar la acción aquí
      // Por ejemplo:
      console.log('El elemento ya no se ve en la pantalla');
      // Puedes ejecutar cualquier código que desees en este punto
    }
  }
}
