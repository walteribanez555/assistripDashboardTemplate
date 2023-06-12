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
    TruncateDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

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
    DollarPipe,
    ExtractDatePipe,
    DateOnlyPipe,
    TruncateDirective
  ]
})
export class SharedModule { }
