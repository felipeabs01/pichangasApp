import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class EquiposService {
  constructor() {}

  equipos$ = new BehaviorSubject<any>(null);
  equiposA$ = new BehaviorSubject<any>(null);
  equiposB$ = new BehaviorSubject<any>(null);

  

 
}
