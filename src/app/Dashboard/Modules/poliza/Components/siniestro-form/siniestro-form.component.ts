import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError, timer } from 'rxjs';
import { error } from 'src/app/Shared/directives/custom-label.directive';
import { Beneficiario } from 'src/app/Shared/models/Data/Beneficiario';
import { Poliza } from 'src/app/Shared/models/Data/Poliza';
import { Siniestro, SiniestroPost } from 'src/app/Shared/models/Data/Siniestro';
import { SiniestroService } from 'src/app/Shared/services/requests/siniestro.service';
import { TransformDataService } from 'src/app/Shared/services/utils/TransformDataService.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'siniestro-form',
  templateUrl: './siniestro-form.component.html',
  styleUrls: ['./siniestro-form.component.css']
})
export class SiniestroFormComponent implements OnInit {

  public inputControl: FormControl<any> | null = null;

  @Input() beneficiarios :Beneficiario[] = [];
  @Input() poliza! : Poliza;
  @Output() addSiniestro = new EventEmitter();

  loading : boolean = false;
  ready : boolean = false;





  private siniestroService  = inject(SiniestroService);
  private transformDataService = inject(TransformDataService);



  public siniestroForm : FormGroup = new FormGroup({
    fechaSiniestro : new FormControl(null, [Validators.required]),
    beneficiario_id: new FormControl(null, [Validators.required]),
    beneficio : new FormControl(null, [Validators.required]),
    descripcion : new FormControl(null),
    file  : new FormControl(null),

  })


  ngOnInit(): void {
      this.inputControl= this.siniestroForm.get('file') as FormControl<any>;
  }





  submitForm(){
    console.log(this.siniestroForm.value);

    if(!this.siniestroForm.valid){
      this.showErrorMessage();
    }
    else{
      this.submitSiniestro();
    }
  }


  showErrorMessage(){
    Swal.fire('Opps','Falta rellenar ciertos campos', 'error');
  }


  submitSiniestro(){
    if(this.loading){
      return;
    }


    this.loading= true;

    const dataInput = this.siniestroForm.get('beneficio')?.value;


    const nuevoSiniestro : SiniestroPost  = {
      tipo_siniestro : this.siniestroForm.value.beneficio,
      beneficiario_id : this.siniestroForm.value.beneficiario_id,
      pais_ocurrencia : this.poliza.destino,
      url_archivo : this.siniestroForm.value.file ? this.siniestroForm.value.file : '',
      fecha_siniestro : this.siniestroForm.value.fechaSiniestro,
      descripcion : this.siniestroForm.value.descripcion ? this.transformDataService.transformSignalstoString(this.siniestroForm.value.descripcion) : '',
      ciudad_ocurrencia : this.siniestroForm.value.ciudad_ocurrencia ? this.siniestroForm.value.ciudad_ocurrencia : '',
    }

    this.siniestroService.postSiniestros(nuevoSiniestro).pipe(
      catchError( (err)=> {
        return throwError(err);
      })
    ).subscribe(
      {
        next : (data) => {
          this.siniestroForm.reset();
          this.siniestroForm.get('beneficio')?.setValue(dataInput);

          this.ready = true;
          this.loading=false;
          timer(2000).subscribe(() => {
            this.ready = false;
          });
          this.showSuccessNotification();
          this.addSiniestro.emit(data);
          },
        error : (err) => { this.loading=false; console.log("error",err)}
      }
    )


  }




  showSuccessNotification() {
    Swal.fire({
      icon: 'success',
      title: 'Siniestro notificado exitosamente',
      text: 'Siniestro registrado correctammente',
      position: 'top-end',
      toast: true,
      timer: 3000,
      showConfirmButton: false
    });
  }



}
