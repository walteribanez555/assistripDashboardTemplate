import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { RolResp } from '../../models/Data/Rol';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {


  // private urlLogin : string = '/api-auth/roles';

  private urlLogin : string = environment.apiBackend + 'roles';


  constructor(
    private readonly http : HttpClient

  ) { }


    getRoles() : Observable<RolResp[]>{

      return this.http.get<RolResp[]>(this.urlLogin);

    }


    postRoles( rol_name : string , rol_structure  : string )  {



      return this.http.post(this.urlLogin, {
        rol_name,
        rol_structure
      }).pipe(
        catchError(
            data => {
              throw new Error(data);
            }
        )
      )

    }

}
