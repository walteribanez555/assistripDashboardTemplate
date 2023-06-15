import { Injectable, computed, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private _lastNavigation =signal<string | null>(null);
  public navigation = computed( () => this._lastNavigation() );

  constructor(private router: Router) {
  }

  // private listenToNavigationChanges(): void {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       this.setLastNavigation(event.urlAfterRedirects);
  //     }
  //   });
  // }

  setLastNavigation(url: string): void {
    console.log(url);
    this._lastNavigation.set(url);
    localStorage.setItem('lastNavigation', url);
  }

  checkLastNavigation(): boolean{
    const lastNavigation = localStorage.getItem('lastNavigation');
    if(lastNavigation){
      this._lastNavigation.set(lastNavigation);
      return true
    }
    return false
  }
}
