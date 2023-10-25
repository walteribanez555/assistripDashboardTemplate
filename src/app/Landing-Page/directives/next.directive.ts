import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private el : ElementRef) {
   }

   @HostListener('click')
   nextFun() {
    var elm = this.el.nativeElement.parentElement.parentElement.children[0];
    var elm2 = this.el.nativeElement.parentElement.parentElement.children[1];
    var item = elm.getElementsByClassName("item");
    var item2 = elm2.getElementsByClassName("item");
    elm.append(item[0]);
    elm2.append(item2[0]);

  }

}
