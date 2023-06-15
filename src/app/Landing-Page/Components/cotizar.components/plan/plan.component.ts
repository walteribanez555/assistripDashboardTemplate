import { Component,EventEmitter,Input, Output} from '@angular/core';
import { ModalService } from 'src/app/Shared/components/modal/modal.service';
import { planbeneficio } from 'src/app/Shared/models/Pages/planbeneficio.model';


@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent {
  body : string = 'md';
  currentPage : number = 1;
  showCart : boolean = false;

  @Input() isSticky : boolean = false;
  @Input() plan! : planbeneficio;
  @Output() servicio = new EventEmitter<planbeneficio>();
  @Output() showServicio = new EventEmitter<planbeneficio>();

  constructor(
    private modalService: ModalService


    ) {}

  // openModal(modalTemplate: TemplateRef<any>) {
    openModal() {
      if(this.plan){

        this.showServicio.emit(this.plan)
      }
    // this.modalService
    //   .open(modalTemplate, { size: 'sm', title: 'Consulta los datos' })
    //   .subscribe((action) => {
    //     console.log('modalAction', action);
    //   });
  }

  changePage(page: number): void{
    this.currentPage = page;

  }

  closeCart(): void{
    this.showCart = false;
    console.log("Cerrado");
  }

  realizado(): void{
    this.showCart = false;

  }

  togglePlan(serv : planbeneficio){
    this.servicio.emit(serv);
  }

}
