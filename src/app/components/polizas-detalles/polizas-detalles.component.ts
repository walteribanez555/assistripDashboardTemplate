import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Poliza } from 'src/app/models/Data/Poliza';
import { cotizacionIntefaceService } from 'src/app/services/interfaces/cotizacioninterface.service';
import { PolizasService } from 'src/app/services/requests/polizas.service';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { ClienteResp } from 'src/app/models/Data/Cliente';


@Component({
  selector: 'app-polizas-detalles',
  templateUrl: './polizas-detalles.component.html',
  styleUrls: ['./polizas-detalles.component.css']
})
export class PolizasDetallesComponent implements OnInit {
  
  listIdPolizas: number[] = [];
  listPolizas: Poliza[] = [];
  nombre : string = "Mireya Alejandra Barriga Lopez";
  titular : ClienteResp | null = null;

  @ViewChild('polizaimprimir', {static: false}) polizaImprimir!: ElementRef;


  constructor(
    private dataService: cotizacionIntefaceService,
    private polizasService : PolizasService,
    private router : Router,
    private cdRef: ChangeDetectorRef,
    

  ){

  }


  ngOnInit():void {

    if(this.dataService.haveData){
      this.listIdPolizas = this.dataService.listPolizas;

      this.titular = this.dataService.titular;

      forkJoin(
        this.listIdPolizas.map(id => this.polizasService.getPolizasById(id))
      ).subscribe(
        data => {
          data.forEach(element => {
            this.listPolizas = [...this.listPolizas, ...element];
          });

        }
      )

    
    }


    

  }


  mostrarDetalles(idPoliza: number){
    this.router.navigate([`../polizas/poliza/${idPoliza}`]);
  }


  downloadPDF() {
    this.cambiarDatos();
  
    console.log("realizando");
    this.cdRef.markForCheck();
  
    setTimeout(() => {
      this.realizarConversion();
      console.log("realizado");
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
      doc.save(`${new Date().toISOString()}_tutorial.pdf`);

    });

  }

  cambiarDatos(){

    if(this.titular){
    this.nombre = this.titular.nombre.concat(" ", this.titular.apellido, " ");
    console.log(this.nombre);

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
