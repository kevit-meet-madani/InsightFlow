import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  private eventSource = new Subject<Object>();

  event$ = this.eventSource.asObservable();

  emitEvent(msg:Object){
    this.eventSource.next(msg);
  }
}