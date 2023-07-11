import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, AfterViewInit, inject } from '@angular/core';
import { forkJoin, map, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Poliza } from 'src/app/Shared/models/Data/Poliza';
import { Cliente, ClienteResp } from 'src/app/Shared/models/Data/Cliente';
import { PolizasService } from 'src/app/Shared/services/requests/polizas.service';
import { AuthService } from 'src/app/Auth/services/auth.service';
import { VentasService } from 'src/app/Shared/services/requests/ventas.service';
import { ClientesService } from 'src/app/Shared/services/requests/clientes.service';
import { Venta } from 'src/app/Shared/models/Data/Venta.model';
import { PolizasVentasService } from 'src/app/Shared/services/requests/polizas-ventas.service';



@Component({
  templateUrl: './polizas-detalles.component.html',
  styleUrls: ['./polizas-detalles.component.css']
})
export class PolizasDetallesComponent implements OnInit, AfterViewInit {

  private authService = inject(AuthService);

  listIdPolizas: number[] = [];
  listPolizas: Poliza[] = [];
  nombre : string = "Mireya Alejandra Barriga Lopez";
  titular : ClienteResp | null = null;
  loading : boolean = false;
  cliente : Cliente | null = null;
  listVentas : Venta[] = [];

  @ViewChild('polizaimprimir', {static: false}) polizaImprimir!: ElementRef;


  constructor(
    private polizasService : PolizasService,
    private router : Router,
    private cdRef: ChangeDetectorRef,
    private ventasService : VentasService,
    private clienteService : ClientesService,
    private polizasVentasService : PolizasVentasService,


  ){

  }


  ngAfterViewInit(): void {
      // this.downloadPDF();
  }

  ngOnInit():void {



    this.loading = true;


    const idClient = this.authService.getIdentifier()

    if(idClient){

      this.clienteService.getClienteById(idClient).pipe(
       switchMap(
           data => {

             this.cliente = data[0]

             return this.ventasService.getVentas()

           }
         ),
       switchMap(
         data => {

           this.listVentas = data.filter( venta => venta.cliente_id === this.cliente?.cliente_id);
           const requests : any[] = [];

           this.listVentas.forEach(venta => {
              requests.push(this.polizasVentasService.getPolizasByVentas(venta.venta_id));
           });

           return forkJoin(requests);
          }
         ),
     ).subscribe(
       data => {
        data.forEach( response => {
          if(response.length > 0){
            this.listPolizas = [ ...this.listPolizas, ...response]
          }

        });


         this.listPolizas = this.listPolizas.reverse();
         this.loading= false;

       }
     )
    }








  }


  mostrarDetalles(idPoliza: number){

    this.router.navigateByUrl(`/dashboard/poliza/${idPoliza}`);
  }


  downloadPDF() {
    this.cambiarDatos();

    this.cdRef.markForCheck();

    setTimeout(() => {
      this.realizarConversion();
    }, 0);
  }


  realizarConversion(){

    const DATA: any = document.getElementById('poliza-imprimir');

    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };

    const request : any[] = [];


    request.push(html2canvas(DATA, options));

    forkJoin(request).subscribe((list_canvas) => {
      list_canvas.forEach(canvas => {
        const img = canvas.toDataURL('image/PNG');
        const bufferX = 0;
        const bufferY = 0;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        doc.addPage();
      });
      doc.save(`${new Date().toISOString()}_poliza.pdf`);

    });

  }

  cambiarDatos(){

    if(this.titular){
      this.nombre = this.titular.nombre.concat(" ", this.titular.apellido, " ");
    }
    else{
      this.nombre= "Walter Ronny Ibañez Saucedo";
    }


    return
  }

  pdfMaker() {
    if (this.polizaImprimir) {
      const pdf = new jsPDF("p", "pt", "a4");
      pdf.html(this.polizaImprimir.nativeElement, {
        callback: function () {
          pdf.save("print.pdf");
        }
      });
    } else {
      console.error("polizaImprimir is undefined");
    }
  }

}
