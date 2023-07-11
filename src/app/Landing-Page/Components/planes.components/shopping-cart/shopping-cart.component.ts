import { Component, ElementRef, EventEmitter, Input, Output, TemplateRef, OnInit } from '@angular/core';
import { Expand } from 'src/app/Shared/animations/expand.animation';
import { Cupon, CuponAplicado } from 'src/app/Shared/models/Data/Cupon';
import { Servicio } from 'src/app/Shared/models/Data/Servicio';
import { planbeneficio } from 'src/app/Shared/models/Pages/planbeneficio.model';
import { CuponesService } from 'src/app/Shared/services/requests/cupones.service';
import { UtilsService } from 'src/app/Shared/services/utils/utils.service';


@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [
    Expand
  ]
})
export class ShoppingCartComponent implements OnInit {
  @Input() size? = 'sm';
  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();
  @Input() planMenores : planbeneficio | null = null;
  @Input() planMayores : planbeneficio | null = null;
  @Input() cotizacionesMenores : number = 0;
  @Input() cotizacionesMayores : number = 0;
  @Input() dias : number = 0;
  @Input() messageReady : boolean = false;
  listCupones : Cupon[] = [];
  listDescuentos : CuponAplicado[] =[] ;
  loading : boolean = false;
  totalBruto = 0 ;
  total = 0;



  precioMayores = {
    precio : 0,
    precioTotal : 0,
    cantidadPolizas : 0,
    servicio : this.planMayores?.serv
  }

  precioMenores = {
    precio : 0,
    precioTotal : 0,
    cantidadPolizas : 0,
    servicio: this.planMenores?.serv
  }




  @Input()
  public listTemplate!: TemplateRef<any>;



  empty : boolean = true;






  constructor(
    private elementRef: ElementRef,
    private cuponesService : CuponesService,
    private utilService : UtilsService,
    ) {}


    ngOnInit(): void {

      this.loading = true;

    if(this.planMenores || this.planMayores){
      this.empty = false;
    }

    this.cuponesService.getCupones().subscribe((cupones) => {
      this.listCupones = this.utilService.filterCouponsByDates(cupones.filter(cupon => cupon.status===1));
      if(this.planMayores){

        this.precioMayores={
          precio : this.planMayores.precio ,
          precioTotal : this.planMayores.precio  * this.cotizacionesMayores ,
          cantidadPolizas : this.cotizacionesMayores,
          servicio : this.planMayores.serv,
        }
      }

      if(this.planMenores){


        this.precioMenores = {
          precio : this.planMenores.precio,
          precioTotal : this.planMenores.precio * this.cotizacionesMenores,
          cantidadPolizas : this.cotizacionesMenores,
          servicio: this.planMenores.serv
        }
      }



      this.realizarDescuentos();

      this.totalBruto = this.precioMayores.precioTotal + this.precioMenores.precioTotal;
      this.total = this.totalBruto  - this.listDescuentos.reduce((a,b) => a + b.montoTotal,0);

      this.loading = false;
    }
    );





  }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit(): void {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }


  realizarDescuentos(){
    this.listDescuentos = this.listCupones.filter(cupon => cupon.servicio_id === this.planMayores?.serv?.servicio_id || cupon.servicio_id === this.planMenores?.serv?.servicio_id)
                            .map(cupon => {
                              const servicioDesc = this.precioMayores.servicio?.servicio_id === cupon.servicio_id ? this.precioMayores : this.precioMenores;
                              switch (cupon.tipo_valor) {
                                case 1:
                                  return {
                                    cupon : cupon,
                                    monto : servicioDesc.precio * (cupon.valor/100),
                                    montoTotal : servicioDesc.precioTotal * (cupon.valor/100),
                                  }
                                case 2:
                                  return {
                                    cupon : cupon,
                                    monto : cupon.valor,
                                    montoTotal : cupon.valor* servicioDesc.cantidadPolizas,
                                  }
                                default:
                                  return {
                                    cupon : cupon,
                                    monto : servicioDesc.precioTotal * (cupon.valor/100),
                                    montoTotal : cupon.valor* servicioDesc.cantidadPolizas,

                                  }
                              }})

  }

  realizarDescuento(cupones :Cupon[], servicio : Servicio, precio : number ,cantidadPolizas : number){
    const descuentos= cupones.filter(cupon => cupon.servicio_id === servicio.servicio_id )
                            .map(cupon => {
                              switch (cupon.tipo_valor) {
                                case 1:
                                  return {
                                    cupon : cupon,
                                    monto : precio * (cupon.valor/100),
                                    montoTotal : (precio * cantidadPolizas) * (cupon.valor/100),
                                  }
                                case 2:
                                  return {
                                    cupon : cupon,
                                    monto : cupon.valor,
                                    montoTotal : cupon.valor* (cantidadPolizas),
                                  }
                                default:
                                  return {
                                    cupon : cupon,
                                    monto : (precio * cantidadPolizas) * (cupon.valor/100),
                                    montoTotal : cupon.valor* cantidadPolizas,

                                  }
                              }})

  }
}
