import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/Shared/models/Data/blog';
import { BlogService } from 'src/app/Shared/services/requests/blog.service';

@Component({
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute);

  isLoading : Boolean = false;

  blogToShow :Blog[] = [];


  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.blogService.getByIdBlog(id).subscribe(
        response => {
          console.log(response);
          this.blogToShow = response;
          this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.blogToShow[0].post.replace('<img', '<img style="width: 100%"'));
          this.isLoading =false;
        }
      )

      // You can perform further actions with the ID here
    });



  }




  private sanitizer = inject(DomSanitizer);

  htmlContent =  this.sanitizer.bypassSecurityTrustHtml('  <h2><strong class="ql-size-huge">PRUEBA DE RESPUESTA</strong></h2><p><img src="https://storage.googleapis.com/redcard-45020.appspot.com/images/5843ab58-9589-4fef-b3fe-c9f935032600?GoogleAccessId=firebase-adminsdk-t82kb%40redcard-45020.iam.gserviceaccount.com&amp;Expires=1893456000&amp;Signature=kXBWGiQrMqIcbNgrPehAFjeDoqgU8n8fPXWQKrg8MhegCkeeOPQwaK83lPWeWLD9%2BIVKD%2BYW6FFsyDZvnsMcNdP3PH2AGahy90VjGduczDRv2msZSU9fhl7YYtj4vhnl%2Fc9YGKlBo2i1JQrmJkVhjRUhRltBSNOv0ogbY8Y%2FjO1RgY52hn6zFHWXxuZ0xpDGG%2BHnei5lGaucu7zTy4dT5GjKW3XjaKDJcWB8mcDZ7FzZhXKctPz3Hgfy9jQ5Dhc4paVlyZgRerK%2FOTkmtLOoCmA3yI5zJusvpTDiflJ1wEa6KFHQKuvVuPgmnpmGHwc5NhfE0ZxClGFB1e3hKZddrQ%3D%3D"></p><p>Este es un texto de prueba generativo, con ninguna funcionalidad en especial, solo demostrar que funciona.</p>'.replace('<img', '<img style="width: 100%"'));




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
