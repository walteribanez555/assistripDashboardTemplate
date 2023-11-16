import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/Shared/services/requests/rest.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


declare global {
  interface Window {
    Stripe?: any;
  }
}

@Component({
  selector: 'data-payment',
  templateUrl: './data-payment.component.html',
  styleUrls: ['./data-payment.component.css']
})
export class DataPaymentComponent implements OnInit {
  private readonly STRIPE!: any; //TODO: window.Stripe

  form: FormGroup = new FormGroup({})
  element : any;
  emailAddress = '';
  @Input() amount! :number;
  @Input()  client_secret! : string;
  @Input() venta_id! : number;
  @Output() closeModal = new EventEmitter();
  isChecking : boolean = false;
  private elementRef = inject(ElementRef);

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private restService: RestService, private route: ActivatedRoute) {
    this.STRIPE = window.Stripe(environment.stripe_pk);
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(1), Validators.max(100000)]],
      cardNumber: [false, [Validators.required, Validators.requiredTrue]], //TODO true | false
      cardCvv: [false, [Validators.required, Validators.requiredTrue]],//TODO true | false
      cardExp: [false, [Validators.required, Validators.requiredTrue]],//TODO true | false
      paymentelement: [false, [Validators.required, Validators.requiredTrue]],

    })

    // this.loadDetail();
    this.createStripeElement()
  }


  private createStripeElement = () => {
    this.form.patchValue({
      amount: parseFloat(this.amount.toFixed(2))
    })

    const appearance = {
      theme: 'stripe',
      cssSrc: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@1,300&display=swap',

    };
    this.element =  this.STRIPE.elements({ appearance, clientSecret: this.client_secret});

    const linkAuthenticationElement = this.element.create("linkAuthentication");
    linkAuthenticationElement.mount("#link-authentication-element");


    linkAuthenticationElement.on('change', (event : any) => {
      this.emailAddress = event.value.email;
    });

    const paymentElementOptions = {
      layout: "tabs",
    };

    const paymentElement = this.element.create("payment", paymentElementOptions);
    paymentElement.mount("#payment-element");

  }

  async initPay(): Promise<any> {

    Swal.fire({

      text: 'Espere un momento mientras se procesa la informacion',
      imageUrl: 'assets/svg/loading.svg',

      showConfirmButton : false,
      allowOutsideClick: false,

      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
    });


  const { error } = await this.STRIPE.confirmPayment({
    elements : this.element,
    confirmParams: {
      return_url: `https://www.assistrip.com/landing-page/confirm-payment/${this.venta_id}`,

    },
  });

  this.isChecking = false;


    if (error.type === "card_error" || error.type === "validation_error") {
      this.showMessage(error.message);
    } else {
      this.showMessage("An unexpected error occurred.");
    }

  }



  showMessage(messageText : string) {
    console.log(messageText);
  }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeModal.emit();
  }


}
