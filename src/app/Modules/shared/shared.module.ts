import { NgModule } from '@angular/core';
import { PopupComponent } from './Components/popup/popup.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './Components/modal/modal.component';
import { ModalService } from './Components/modal/modal.service';
import { PaginationComponent } from './Components/pagination/pagination.component';
import { ScrollVisibilityDirective } from './directives/scroll-visibility.directive';
import { LoadingComponent } from './Components/loading/loading.component';




@NgModule({
  declarations: [
    PopupComponent,
    ModalComponent,
    PaginationComponent,
    ScrollVisibilityDirective,
    LoadingComponent,



  ],
  imports:[
    CommonModule,

  ],

  exports: [
    PopupComponent,
    ModalComponent,
    PaginationComponent,
    ScrollVisibilityDirective,
    LoadingComponent,

  ],
  providers: [
  ]
})
export class SharedModule { }
