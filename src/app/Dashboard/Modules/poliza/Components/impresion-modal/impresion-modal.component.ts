import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import html2canvas from 'html2canvas';
import {  map, switchMap } from 'rxjs';
import { Beneficiario } from 'src/app/Shared/models/Data/Beneficiario';
import { Catalogo } from 'src/app/Shared/models/Data/Catalogo';
import { Plan } from 'src/app/Shared/models/Data/Plan';
import { Poliza } from 'src/app/Shared/models/Data/Poliza';
import { Servicio } from 'src/app/Shared/models/Data/Servicio';
import { catalogoBeneficio } from 'src/app/Shared/models/Pages/catalogoBeneficio.model';
import { CatalogosService } from 'src/app/Shared/services/requests/catalogos.service';
import { PlanesService } from 'src/app/Shared/services/requests/planes.service';
import { ServiciosService } from 'src/app/Shared/services/requests/servicios.service';
import { UtilsService } from 'src/app/Shared/services/utils/utils.service';
import { GeneratePdfService } from '../../services/generate-pdf.service';
import { BeneficiarioPdfService } from '../../utils/pdf/beneficiario-pdf.service';
import Swal from 'sweetalert2';


export interface canvasInterface {
  id_beneficiario : number,
  canva  : HTMLCanvasElement
}


@Component({
  selector: 'impresion-modal',
  templateUrl: './impresion-modal.component.html',
  styleUrls: ['./impresion-modal.component.css']
})
export class ImpresionModalComponent implements OnInit {

  private servicioService = inject(ServiciosService);
  private planService = inject(PlanesService);
  private elementRef = inject(ElementRef);
  private catalogoService = inject(CatalogosService);
  private utilsService = inject(UtilsService);
  private pdfService = inject(GeneratePdfService);
  private beneficiarioPdf = inject(BeneficiarioPdfService)



  @Output() closeModal = new EventEmitter();
  @Input() beneficiarios : Beneficiario[] = [];
  @Input() poliza! : Poliza;

  @ViewChild('canvaContainer') canvaContainer!: ElementRef;
  @ViewChild('polizasPdf', { static: true }) polizasPdfTemplate!: TemplateRef<any>;



  servicio : Servicio | null = null;
  plan  : Plan[] =[];
  beneficios : Catalogo[] = [];

  listBeneficiosMapped : catalogoBeneficio[]= [];


  loading : boolean = false;


  canvasDataMap: canvasInterface[] = []


  ngOnInit(): void {

    this.loading = true;
    this.servicioService.getServicioById(this.poliza.servicio_id).pipe(
      switchMap(
        data => {
          this.servicio = data[0];

          return this.planService.getPlanById(this.servicio.servicio_id)
        }
      ),
      switchMap(
        data => {
          this.plan = data;

          return this.catalogoService.getBeneficios()
        }
      ),
      map(
        data => {
          this.beneficios = data;

          this.listBeneficiosMapped =  this.utilsService.mapListBeneficio(this.plan, this.beneficios);

        }

      )
    ).subscribe(
      {
        next : ( data ) => {
          this.loading = false;


        },
        error : ( err ) => {
          console.log(err);
        }
      }
    )


  }




  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeModal.emit();
  }



  getCanva( beneficiario_id : number){

    const options = {
      background: 'white',
      scale: 3
    };

    const poliza = document.getElementById(beneficiario_id.toString());

    const id = beneficiario_id;

    if(!poliza){
      console.log("Poliza not found");
      return;
    }



    html2canvas(poliza, options).then(
      (canvas : HTMLCanvasElement) => {
        const containerWidth = this.canvaContainer.nativeElement.offsetWidth;
        const containerHeight = containerWidth * (3508 / 2480); // Maintain the aspect ratio of 2480x3508

        canvas.style.maxWidth = '100%'; // Set the desired maximum width of the canvas
        canvas.style.maxHeight = '100%'; // Set the desired maximum height of the canvas
        canvas.style.width = `${containerWidth}px`; // Set the canvas width to fit the container
        canvas.style.height = `${containerHeight}px`; // Set the canvas height to maintain the aspect ratio

        const newCanva : canvasInterface = {
          id_beneficiario : id,
          canva : canvas
        }
        this.canvasDataMap = [...this.canvasDataMap , newCanva]; // Save canvas and beneficiary ID in the map
        this.canvaContainer.nativeElement.appendChild(canvas);
      }
    )
  }



  downloadAllCanvas(){

    const allCanvases = this.canvasDataMap.map(
      canva => canva.canva
    ) as HTMLCanvasElement[]

    this.pdfService.generatePdfAsync(...allCanvases).subscribe({
      next: () => {
        // PDF generation succeeded
        console.log('PDF generated successfully.');
      },
      error: (error: any) => {
        // PDF generation failed
        console.error('Error generating PDF:', error);
      },
      complete: () => {
        // PDF generation completed
      }
    });
  }


  downloadBeneficiario( beneficiario_id : number){

      const canva = this.canvasDataMap.filter( canva => canva.id_beneficiario === beneficiario_id).map(canvas => canvas.canva);
      if(!canva){
        return;
      }

      this.pdfService.generatePdfAsync(...canva).subscribe({
        next: () => {
          // PDF generation succeeded
          console.log('PDF generated successfully.');
        },
        error: (error: any) => {
          // PDF generation failed

          this.showErrorNotification(error);

        },
        complete: () => {

          this.showSuccessNotification("Puede descargar el pdf")
        }
      });

  }

    showSuccessNotification( message : string) {
      Swal.fire({
        icon: 'success',
        title: 'Pdf generado exitosamente',
        text: message,
        position: 'top-end',
        toast: true,
        timer: 3000,
        showConfirmButton: false
      });
    }


    showErrorNotification( message : string) {
      Swal.fire({
        icon: 'error',
        title: 'Hubo un problema en la generacion del pdf',
        text: message,
        position: 'top-end',
        toast: true,
        timer: 3000,
        showConfirmButton: false
      });


    }
}


