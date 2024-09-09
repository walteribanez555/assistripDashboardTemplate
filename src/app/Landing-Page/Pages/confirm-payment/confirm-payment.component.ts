import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { Poliza, PolizaResp } from 'src/app/Shared/models/Data/Poliza';
import { PolizasService } from 'src/app/Shared/services/requests/polizas.service';
import { VentasService } from 'src/app/Shared/services/requests/ventas.service';
import { LocalStorageService } from 'src/app/Shared/services/utils/local-storage.service';

@Component({
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.css'],
})
export class ConfirmPaymentComponent implements OnInit {
  ngOnInit(): void {
    const params = this.route.snapshot.queryParams;

    const { result } = params;
    // console.log({result});

    const itemsResult = result.split('-');

    const ventas = itemsResult[0].split(',');
    const polizas = itemsResult[1].split(',');

    console.log({ ventas, polizas });

    const ventaRequests: any[] = [];
    const polizasRequests: any[] = [];

    ventas.forEach((venta: number) => {
      ventaRequests.push(this.ventaService.updateVenta(venta, 2));
    });
    polizas.forEach((poliza: number) => {
      polizasRequests.push(this.polizaService.getPolizasById(poliza));
    });

    forkJoin(ventaRequests)
      .pipe(
        switchMap(() => forkJoin(polizasRequests)),
        switchMap((polizas: Poliza[][]) => {
          const requestPolizaToUpdate: any[] = [];

          polizas.forEach((poliza) => {
            const polizaToUpdate = poliza[0];

            requestPolizaToUpdate.push(
              this.polizaService.putPolizas(
                polizaToUpdate.poliza_id,
                polizaToUpdate.fecha_salida.split('T')[0],
                polizaToUpdate.fecha_retorno.split('T')[0],
                2
              )
            );
          });

          return forkJoin(requestPolizaToUpdate);
        })
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {},
      });

    // this.route.params.subscribe(
    //   params  => {
    //     this.ventaId = params['id'];
    //   }
    // )

    // if(this.ventaId){

    //   this.ventaService.updateVenta(this.ventaId, 3 ).subscribe(
    //     {
    //       next : (data ) => { console.log(data)},
    //       error : ( err) => { console.log(err)},
    //       complete : () => {},
    //     }
    //   )
    // }

    // const polizas : PolizaResp[] = this.localStorageService.getPolizasToUpdate();

    // const requests : any[] = [];

    // console.log(polizas);
    // polizas.forEach( poliza => { requests.push( this.polizaService.putPolizas(poliza.id, poliza.fecha_salida, poliza.fecha_retorno, 0))})

    // forkJoin(requests).subscribe(
    //   data => {
    //     console.log(data);
    //   }
    // )
  }

  private route = inject(ActivatedRoute);
  private ventaService = inject(VentasService);
  private localStorageService = inject(LocalStorageService);
  private polizaService = inject(PolizasService);
  ventaId: number | null = null;
}
