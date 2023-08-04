import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { errorHandler } from '../handlers/errorHandler.handlers';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenService } from '../services/utils/token.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly tokenService :TokenService,
    private router : Router,


  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {



    return next.handle(request).pipe(
      catchError( (error) => {
        console.log("Error por aqui");

        console.log(error);
        if( error instanceof HttpErrorResponse){
          if(error.error instanceof ErrorEvent){
            console.log(`Error event`);
          }else {
            const errorType = errorHandler(error);
            console.log(error);

            switch (errorType){

              case  HttpStatusCode.BadRequest:

                break;

              case  498:
                Swal.fire({
                  position: 'top-end',
                  icon: 'info',
                  title: 'Expiro la sesion',
                  // Other Swal.fire() options
                });
                this.tokenService.deleteToken();
                this.router.navigateByUrl('/auth/login');
                break;
            }

            throw new Error();

          }
        }else{
          console.log('An error ocurred');
        }
        return throwError(()=> new Error(error.statusText))
      })
    )
  }
}


