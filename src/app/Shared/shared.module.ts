import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ModalComponent } from './components/modal/modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PopupComponent } from './components/popup/popup.component';
import { CustomLabelDirective } from './directives/custom-label.directive';
import { ScrollVisibilityDirective } from './directives/scroll-visibility.directive';
import { TruncateDirective } from './pipes/truncate.pipe';
import { DollarPipe } from './pipes/dolar.pipe';
import { ExtractDatePipe } from './pipes/extract-date.pipe';
import { DateOnlyPipe } from './pipes/getDateOnly.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { LoadingDivComponent } from './components/loading-div/loading-div.component';
import { ListCatsComponent } from './components/list-cats/list-cats.component';
import { CatComponent } from './components/cat/cat.component';
import { BeneficioComponent } from './components/beneficio/beneficio.component';
import { FileDropComponent } from './components/file-drop/file-drop.component';
import { UploadFileDirective } from './directives/upload-file.directive';
import { ListBeneficiarioComponent } from './components/list-beneficiario/list-beneficiario.component';
import { BeneficiarioComponent } from './components/beneficiario/beneficiario.component';
import { ZeroToMessagePipe } from './pipes/zero-to-message.pipe';
import { LoadingProcessComponent } from './components/loading-process/loading-process.component';
import { SignalsPipe } from './pipes/signals.pipe';




@NgModule({
  declarations: [
    NotFoundComponent,
    PopupComponent,
    ModalComponent,
    PaginationComponent,
    ScrollVisibilityDirective,
    LoadingComponent,
    TruncateDirective,
    CustomLabelDirective,
    DollarPipe,
    ExtractDatePipe,
    DateOnlyPipe,
    TruncateDirective,
    NavbarComponent,
    LoadingDivComponent,
    ListCatsComponent,
    CatComponent,
    BeneficioComponent,
    FileDropComponent,
    UploadFileDirective,
    ListBeneficiarioComponent,
    BeneficiarioComponent,
    ZeroToMessagePipe,
    LoadingProcessComponent,
    SignalsPipe,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

  ],
  exports : [
    NotFoundComponent,
    PopupComponent,
    ModalComponent,
    PaginationComponent,
    ScrollVisibilityDirective,
    LoadingComponent,
    TruncateDirective,
    CustomLabelDirective,
    UploadFileDirective,
    DollarPipe,
    ExtractDatePipe,
    DateOnlyPipe,
    TruncateDirective,
    NavbarComponent,
    LoadingDivComponent,
    ListCatsComponent,
    BeneficioComponent,
    FileDropComponent,
    ZeroToMessagePipe,
    LoadingProcessComponent,
    SignalsPipe,


  ]
})
export class SharedModule { }
