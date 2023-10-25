import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrev]'
})
export class PrevDirective {

  constructor( private el : ElementRef  ) { }

  @HostListener('click')
  prevFun() {
    var elm = this.el.nativeElement.parentElement.parentElement.children[0];
    var elm2 = this.el.nativeElement.parentElement.parentElement.children[1];
    var item = elm.getElementsByClassName("item");
    var item2 = elm2.getElementsByClassName("item");
    elm.prepend(item[item.length-1]);
    elm2.append(item2[0]);

  }

}
