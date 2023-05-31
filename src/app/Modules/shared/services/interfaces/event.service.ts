import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  private reloadPageSource = new Subject<void>();

  reloadPage$ = this.reloadPageSource.asObservable();

  reloadPage() {
    this.reloadPageSource.next();
  }
}
