import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { Poliza } from 'src/app/Shared/models/Data/Poliza';
import { ClienteResp } from 'src/app/Shared/models/Data/Cliente';
import { cotizacionIntefaceService } from 'src/app/Shared/services/interfaces/cotizacioninterface.service';
import { PolizasService } from 'src/app/Shared/services/requests/polizas.service';



@Component({
  selector: 'polizas-detalles',
  templateUrl: './polizas-detalles.component.html',
  styleUrls: ['./polizas-detalles.component.css']
})
export class PolizasDetallesComponent implements OnInit, AfterViewInit {

  listIdPolizas: number[] = [];
  listPolizas: Poliza[] = [];
  nombre : string = "Mireya Alejandra Barriga Lopez";
  titular : ClienteResp | null = null;
  loading : boolean = false;

  @ViewChild('polizaimprimir', {static: false}) polizaImprimir!: ElementRef;


  constructor(
    private dataService: cotizacionIntefaceService,
    private polizasService : PolizasService,
    private router : Router,
    private cdRef: ChangeDetectorRef,


  ){

  }


  ngAfterViewInit(): void {
      this.downloadPDF();
  }

  ngOnInit():void {

    this.loading = true

    if(this.dataService.haveData){
      this.listIdPolizas = this.dataService.listPolizas;

      this.titular = this.dataService.titular;

      forkJoin(
        this.listIdPolizas.map(id => this.polizasService.getPolizasById(id))
      ).subscribe(
        data => {
          this.loading = false
          data.forEach(element => {
            this.listPolizas = [...this.listPolizas, ...element];
          });


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
    const data2: any = document.getElementById('poliza-imprimir');

    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };

    const request : any[] = [];


    request.push(html2canvas(DATA, options));
    request.push(html2canvas(data2, options));

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
