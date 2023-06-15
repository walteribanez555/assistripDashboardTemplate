import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { error } from 'src/app/Shared/directives/custom-label.directive';
import { Beneficiario } from 'src/app/Shared/models/Data/Beneficiario';
import { Poliza } from 'src/app/Shared/models/Data/Poliza';
import { Siniestro, SiniestroPost } from 'src/app/Shared/models/Data/Siniestro';
import { SiniestroService } from 'src/app/Shared/services/requests/siniestro.service';
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

  siniestroService  = inject(SiniestroService);


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



  showFile(){
    console.log(this.inputControl?.value);
  }


  submitForm(){
    if(!this.siniestroForm.valid){
      this.showErrorMessage();
    }
    else{
      console.log(this.siniestroForm);
      this.submitSiniestro();
    }
  }


  showErrorMessage(){
    Swal.fire('Opps','Falta rellenar ciertos campos', 'error');
  }


  submitSiniestro(){
    const nuevoSiniestro : SiniestroPost  = {
      tipo_siniestro : this.siniestroForm.value.beneficio,
      beneficiario_id : this.siniestroForm.value.beneficiario_id,
      pais_ocurrencia : this.poliza.destino,
      url_archivo : this.siniestroForm.value.file ? this.siniestroForm.value.file : '',
      fecha_siniestro : this.siniestroForm.value.fechaSiniestro,
      descripcion : this.siniestroForm.value.descripcion ? this.siniestroForm.value.descripcion : '',
      ciudad_ocurrencia : this.siniestroForm.value.ciudad_ocurrencia ? this.siniestroForm.value.ciudad_ocurrencia : '',
    }

    this.siniestroService.postSiniestros(nuevoSiniestro).pipe(
      catchError( (err)=> {
        return throwError(err);
      })
    ).subscribe(
      {
        next : (data) => { console.log("Data",data)},
        error : (err) => { console.log("error",err)}
      }
    )


  }





}
