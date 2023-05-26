import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { planbeneficio } from 'src/app/Modules/shared/models/Pages/planbeneficio.model';

@Component({
  selector: 'info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit, OnChanges {
  @Input() size? = 'sm';
  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();
  @Input() plan! : planbeneficio

  @Input()
  public listTemplate!: TemplateRef<any>;

  ngOnInit(): void {



  }

  ngOnChanges(): void {
      // console.log(this.plan);
  }



  constructor(private elementRef: ElementRef) {}

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }

}
