import { Directive, ElementRef, OnInit , Input} from '@angular/core';
import { ValidationErrors } from '@angular/forms';



export enum error {
  required = 'required',
  minLength = 'minlength',
  email = 'email',
  validatePhoneNumber = 'validatePhoneNumber',
  invalidEmail = 'invalidEmail',
  futureDate = 'futureDate',
  dateGreater = 'dateGreater',
  dateLessThan = 'dateLessThan',


}

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?  : ElementRef<HTMLElement>;
  private _color   : string = "red";
  private _errors? : ValidationErrors | null;

  @Input()  set color(value : string){
   this._color = value;
   this.setStyle();
  }

  @Input() set errors(value : ValidationErrors | null ){
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(private el : ElementRef<HTMLElement>) {


    this.htmlElement = el;


   }


   ngOnInit(): void {
    this.setStyle();
   }

   setStyle() : void{

    if(!this.htmlElement)return;


    this.htmlElement.nativeElement.style.color = this._color;
   }

   setErrorMessage(): void {


    if(!this.htmlElement) return;

    if( !this._errors){



      const spanElement = document.createElement('span');
      spanElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="M480-80q-85 0-158-30.5T195-195q-54-54-84.5-127T80-480q0-84 30.5-157T195-764q54-54 127-85t158-31q75 0 140 24t117 66l-43 43q-44-35-98-54t-116-19q-145 0-242.5 97.5T140-480q0 145 97.5 242.5T480-140q145 0 242.5-97.5T820-480q0-30-4.5-58.5T802-594l46-46q16 37 24 77t8 83q0 85-31 158t-85 127q-54 54-127 84.5T480-80Zm-59-218L256-464l45-45 120 120 414-414 46 45-460 460Z"/></svg>`;



      // this.htmlElement.nativeElement.style.color = "green";
      this.htmlElement.nativeElement.innerText = '';
      this.htmlElement.nativeElement.appendChild(spanElement)
      this.htmlElement.nativeElement.style.fill = "green";
      this.htmlElement.nativeElement.style.display = "flex";
      this.htmlElement.nativeElement.style.alignItems  ="center";
      this.htmlElement.nativeElement.style.justifyContent = "center";
      this.htmlElement.nativeElement
      return;
    }

    const errors = Object.keys(this._errors);




    if(errors.includes(error.required)){
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }
    if(errors.includes(error.minLength)){
      this.htmlElement.nativeElement.innerText = "Debe de ser minimo de 6 letras";
      return;
    }

    if(errors.includes(error.email)){
      this.htmlElement.nativeElement.innerText= "Debe de ser de formato email";
      return;
    }

    if(errors.includes(error.invalidEmail)){
      this.htmlElement.nativeElement.innerText="Debe de ser de formato email"
    }


    if(errors.includes(error.validatePhoneNumber)){
      this.htmlElement.nativeElement.innerText = "El formato del numero es incorrecto";
      return;
    }

    if(errors.includes(error.dateGreater)){
      this.htmlElement.nativeElement.innerText = "La edad es mayor a 75 años";
      return
    }

    if(errors.includes(error.dateLessThan)){
      this.htmlElement.nativeElement.innerText = "La edad es menor a 75 años";
      return
    }


    if(errors.includes(error.futureDate)){
      this.htmlElement.nativeElement.innerText = "La fecha es mayor a la actual";
      return
    }


   }

}
