import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { PolizaPdfComponent } from './poliza-pdf/poliza-pdf.component';
import { Beneficiario } from 'src/app/Shared/models/Data/Beneficiario';
import { Servicio } from 'src/app/Shared/models/Data/Servicio';
import { catalogoBeneficio } from 'src/app/Shared/models/Pages/catalogoBeneficio.model';
import { Poliza } from 'src/app/Shared/models/Data/Poliza';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioPdfService {
  private modalNotifier?: Subject<number>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  setListPdf(content: TemplateRef<any>, listBeneficiarios: Beneficiario[], servicio: Servicio,  listBeneficiosMapped: catalogoBeneficio[], poliza: Poliza) {
    const modalNotifiers: Subject<number>[] = [];

    listBeneficiarios.forEach((beneficiario: Beneficiario) => {
      const pdfBeneficiarioComponentFactory = this.resolver.resolveComponentFactory(PolizaPdfComponent);
      const contentViewRef = content.createEmbeddedView(null);
      const pdfComponent = pdfBeneficiarioComponentFactory.create(this.injector, [contentViewRef.rootNodes]);

      pdfComponent.instance.beneficiario = beneficiario;
      pdfComponent.instance.poliza = poliza;
      pdfComponent.instance.beneficiosMapped = listBeneficiosMapped;
      pdfComponent.instance.servicio = servicio;
      const modalNotifier = new Subject<number>();

      pdfComponent.instance.isLoaded.subscribe(
        data => {
          console.log(data);
        }
      );

      pdfComponent.instance.isLoaded.subscribe((value: number) => {
        modalNotifier.next(value);
      });

      pdfComponent.instance.isLoaded.complete();

      pdfComponent.hostView.detectChanges();

      this.document.body.appendChild(pdfComponent.location.nativeElement);
      modalNotifiers.push(modalNotifier);
    });

    return modalNotifiers;
  }

  private submitModal(beneficiario: number) {
    this.modalNotifier?.next(beneficiario);
    this.modalNotifier?.complete();
  }
}
