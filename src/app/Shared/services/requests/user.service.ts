import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { User } from '../../models/Data/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private urlLogin : string = '/api-auth/users';

  private urlLogin : string = environment.apiBackend + '/users';



  constructor(
    private readonly http : HttpClient

  ) { }


    getUsers() : Observable<User[]>{

      return this.http.get<User[]>(this.urlLogin);

    }

    getByUsernameUsers(id : string) : Observable<User[]>{

      let params = new HttpParams;

      params = params.append('id',id);

      return this.http.get<User[]>(this.urlLogin,{params});



    }





    postUser( username : string , rol_id  : string, user_type : string, password: string, confirm  : string, first_name : string, last_name : string, email : string, phone : string )  {



      return this.http.post(this.urlLogin, {
        username,
        rol_id,
        user_type,
        password,
        confirm,
        first_name,
        last_name,
        email,
        phone,
      }).pipe(
        catchError(
            data => {
              throw new Error(data);
            }
        )
      )

    }







}
