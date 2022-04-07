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

  numberVerifyCreation(obj): Observable<any> {
    return this.http.post(`${environment.API_URL}/numverify_request/numberVerifyRequest`, obj).pipe(
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
