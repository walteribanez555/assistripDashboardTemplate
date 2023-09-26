import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { TokenService } from "../services/utils/token.service";

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.tokenService.getToken();
    if (token) {
      const requestWithToken = req.clone({
        headers: new HttpHeaders({
          Authorization: token
        })
      });
      return next.handle(requestWithToken);
    } else {
      return next.handle(req);
    }
  }
}
