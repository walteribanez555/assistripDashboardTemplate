import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[truncateText]'
})
export class TruncateDirective implements OnInit {
  @Input() truncateText: number =10;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const text = this.el.nativeElement.innerText;
    if (text.length > this.truncateText) {
      this.el.nativeElement.innerText = text.substring(0, this.truncateText) + '...';
    }
  }
}
