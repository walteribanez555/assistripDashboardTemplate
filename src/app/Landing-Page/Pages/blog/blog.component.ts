import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.scrollToTop();
  }

  private sanitizer = inject(DomSanitizer);

  htmlContent =  this.sanitizer.bypassSecurityTrustHtml('  <h2><strong class="ql-size-huge">PRUEBA DE RESPUESTA</strong></h2><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><img src="https://storage.googleapis.com/redcard-45020.appspot.com/images/5843ab58-9589-4fef-b3fe-c9f935032600?GoogleAccessId=firebase-adminsdk-t82kb%40redcard-45020.iam.gserviceaccount.com&amp;Expires=1893456000&amp;Signature=kXBWGiQrMqIcbNgrPehAFjeDoqgU8n8fPXWQKrg8MhegCkeeOPQwaK83lPWeWLD9%2BIVKD%2BYW6FFsyDZvnsMcNdP3PH2AGahy90VjGduczDRv2msZSU9fhl7YYtj4vhnl%2Fc9YGKlBo2i1JQrmJkVhjRUhRltBSNOv0ogbY8Y%2FjO1RgY52hn6zFHWXxuZ0xpDGG%2BHnei5lGaucu7zTy4dT5GjKW3XjaKDJcWB8mcDZ7FzZhXKctPz3Hgfy9jQ5Dhc4paVlyZgRerK%2FOTkmtLOoCmA3yI5zJusvpTDiflJ1wEa6KFHQKuvVuPgmnpmGHwc5NhfE0ZxClGFB1e3hKZddrQ%3D%3D"></p><p>Este es un texto de prueba generativo, con ninguna funcionalidad en especial, solo demostrar que funciona.</p>'.replace('<img', '<img style="width: 100%"'));



  scrollToTop() {
    const scrollDuration = 300; // You can adjust the duration as needed
    const scrollStep = -window.scrollY / (scrollDuration / 300);

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        this.renderer.setProperty(document.documentElement, 'scrollTop', window.scrollY + scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  }


  message : string = "Compartir Enlace";


  takeLink(){

    const link = window.location.href; // Obtiene el enlace actual

    navigator.clipboard.writeText(link);
    this.message = "Link copiado";

    setTimeout(() => {
      this.message = 'Compartir Enlace';
    }, 2000);
  }

}
