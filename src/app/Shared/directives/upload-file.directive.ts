import { Directive, ElementRef, OnInit , Input} from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';





@Directive({
  selector: '[uploadFile]'
})
export class UploadFileDirective implements OnInit {

  private htmlElement?  : ElementRef<HTMLElement>;
  private _message : string  ="";


  @Input() set file( f : FormControl ){

    if(f.value)
    this._message = f.value;

    this.setMessage();
  }



  constructor(private el : ElementRef<HTMLElement>) {


    this.htmlElement = el;


   }


   ngOnInit(): void {
    this.setStyle();
   }

   setStyle() : void{

    if(!this.htmlElement)return;



   }

   setMessage(): void {


    if(!this.htmlElement) return;

    if( this._message.length === 0 ){



      const spanElement = document.createElement('span');
      spanElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M452-202h60v-201l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554v-186H220v680h520v-494H551ZM220-820v186-186 680-680Z"/></svg>`;



      // this.htmlElement.nativeElement.style.color = "green";
      this.htmlElement.nativeElement.innerText = 'Seleccione algun archivo';
      this.htmlElement.nativeElement.appendChild(spanElement)
      this.htmlElement.nativeElement.style.fill = "var(--main-color)";
      this.htmlElement.nativeElement.style.display = "flex";
      this.htmlElement.nativeElement.style.flexDirection="column"
      this.htmlElement.nativeElement.style.alignItems  ="center";
      this.htmlElement.nativeElement.style.justifyContent = "center";
      this.htmlElement.nativeElement
      return;
    }else{
      console.log("Si hay archivo");
      this.htmlElement.nativeElement.innerText = this._message;
    }






   }

}
