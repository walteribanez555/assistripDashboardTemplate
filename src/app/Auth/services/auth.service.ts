import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';

import { AuthStatus, CheckTokenResponse, LoginResponse} from '../interfaces';
import { User } from 'src/app/Shared/models/Data/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.apiBackend

  private http = inject( HttpClient );

  private _currentUser = signal<User|null>(null);
  private _currentClient = signal<string|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );


  constructor() {
    this.checkAuthStatus();
  }

  private setAuthentication( sessionToken : string  , identifier : string): boolean {



    const client =  identifier.split('_')[0];
    const office_id = identifier.split('_')[1];
    // this._currentUser.set( user );
    this._currentClient.set( identifier);
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('Authorization', sessionToken);
    localStorage.setItem('identifier',identifier);
    localStorage.setItem('client',client);
    localStorage.setItem('office_id',office_id);



    return true;
  }



  loadByDefaultUser(){
    return this.setAuthentication("ExternalUser902010", "cliente");
  }


  login( username: string, password: string ) {

    const url  = `${ this.baseUrl }/sessions`;
    const body = { username, password };


    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ({ sessionToken }) => {
          this.setAuthentication( sessionToken, username );

        }),

        catchError( err => throwError( () => err ))
      );
    }

  checkAuthStatus():boolean{

    const token = localStorage.getItem('Authorization');
    const identifier = localStorage.getItem('identifier');

    if ( !token  || !identifier) {
      this.logout();
      // return of(false);
    }


    if( token && identifier){
      return false;
    }

    return this.loadByDefaultUser()

  }

  logout() {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('identifier');
    this._currentUser.set(null);
    this._currentClient.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );
  }


  isInvited(){
    const identifier = localStorage.getItem('identifier');

    if( identifier && identifier === "cliente"){
      return true
    }


    return false;
  }


  getToken() : string | null{
    const token = localStorage.getItem('Authorization');
    return token;
  }

  getIdentifier() : string | null{
    const identifier = localStorage.getItem('identifier');
    return identifier;
  }

  getClient() : string | null{
    const client = localStorage.getItem('client');
    return client;
  }
}
