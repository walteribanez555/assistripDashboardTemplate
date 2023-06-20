import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError, timer } from 'rxjs';
import { Message } from 'src/app/Shared/models/Data/Mensaje';
import { MensajeService } from 'src/app/Shared/services/requests/mensaje.service';
import { TransformDataService } from 'src/app/Shared/services/utils/transform-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'mensaje-form',
  templateUrl: './mensaje-form.component.html',
  styleUrls: ['./mensaje-form.component.css']
})
export class MensajeFormComponent implements OnInit {


  @Input() idSiniestro!  : number;
  @Output() addMessage = new EventEmitter();
  public inputControl: FormControl<any> | null = null;

  private messageService = inject(MensajeService);
  private transformDataService = inject(TransformDataService);

  loading: boolean  = false;
  showReady : boolean = false;


  public messageForm : FormGroup = new FormGroup({
    message : new FormControl(null, [ Validators.required]),
    file : new FormControl(null),
  })


  ngOnInit(): void {
    this.inputControl= this.messageForm.get('file') as FormControl<any>;

  }




  submitForm(){
    if(!this.messageForm.valid){
      this.showErrorMessage();
    }
    else{
      // console.log(this.messageForm);
      // this.submitSiniestro();
      this.submitMessage();
    }
  }


  showErrorMessage(){
    Swal.fire('Opps','Falta rellenar ciertos campos', 'error');
  }


  submitMessage(){

    if(this.loading){
      return;
    }

    this.loading= true;




    const { message , file } = this.messageForm.value;


    const nuevoMensage : Message = {
      mensaje : this.transformDataService.transformSignalstoString(message),
      url_archivo : file ? file : '',
      fecha_mesaje : this.formatDate(),
      es_operador : 0,
      siniestro_id : this.idSiniestro,
      comunicacion_id: 1,
    }

    this.messageService.postMessage(nuevoMensage).pipe(
      catchError( (err)=> {
        return throwError(err);
      })
    ).subscribe({
      next  : (data) =>  {
          console.log(data);
          this.messageForm.reset();
          this.showReady = true;
          this.loading=false;
          timer(2000).subscribe(() => {
            this.showReady = false;
          });
          this.showSuccessNotification();
          this.addMessage.emit(data);
        },
      error : (error) => { console.log("Hubo un error"); console.log( error ) },

    })



  }






    formatDate(): string {
      const date = new Date();
      const year = date.getFullYear();
      const month = this.padZero(date.getMonth() + 1);
      const day = this.padZero(date.getDate());
      return `${year}-${month}-${day}`;
    }

    padZero(value: number): string {
      return value < 10 ? `0${value}` : `${value}`;
    }


  showSuccessNotification() {
    Swal.fire({
      icon: 'success',
      title: 'Mensaje enviado exitosamente',
      text: 'Mensaje enviado exitosamente',
      position: 'top-end',
      toast: true,
      timer: 3000,
      showConfirmButton: false
    });
  }


}
