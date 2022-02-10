import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class numVerifyRequestService {

  constructor(
    private http: HttpClient,
    public router: Router,
  ) { }

  // insert Inventory
  numberVerifyCreation(obj): Observable<any> {
    return this.http.post(`${environment.API_URL}/numverify_request/numberVerifyRequest`,obj).pipe(
      catchError(this.handleError)
    )
  }  

  // catch error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
