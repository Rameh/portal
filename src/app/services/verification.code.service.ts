import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VerificationCodeService {

    constructor(private http: HttpClient) { }

    // get verification code SMS
    sendVerificationCodeSMS(data): Observable<any> {
        return this.http.post(`${environment.API_URL}/twilio/sendVerificationCodeSMS`, data).pipe(
            catchError(this.handleError)
        )
    }

    // get verification code Email
    sendVerificationCodeEmail(data): Observable<any> {
        return this.http.post(`${environment.API_URL}/sendgrid/sendVerificationCodeEmail`, data).pipe(
            catchError(this.handleError)
        )
    }

    // POST Sheduled Email
    sendScheduledEmailNotification(data): Observable<any> {
        return this.http.post(`${environment.API_URL}/workorder/sendScheduledEmailNotification`, data).pipe(
            catchError(this.handleError)
        )
    }

    // POST Re-Sheduled Email
    sendReScheduledEmailNotification(data): Observable<any> {
        return this.http.post(`${environment.API_URL}/workorder/sendReScheduledEmailNotification`, data).pipe(
            catchError(this.handleError)
        )
    }

    // get verification code Email
    sendScheduledSMSNotification(data): Observable<any> {
        return this.http.post(`${environment.API_URL}/workorder/sendScheduledSMSNotification`, data).pipe(
            catchError(this.handleError)
        )
    }

    // get verification code for forgot / reset password
    sendVerificationCodeForPassword(data): Observable<any> {
        return this.http.post(`${environment.API_URL}/communication/sendverificationcodepassword`, data).pipe(
            catchError(this.handleError)
        )
    }

    sendVerificationCodeForLead(data): Observable<any> {
        return this.http.post(`${environment.API_URL}/communication/sendleadverificationcode`, data).pipe(
            catchError(this.handleError)
        )
    }

    // get verification code secret
    getVerificationCodeSecret(): Observable<any> {
        return this.http.get(`${environment.API_URL}/communication/verificationcodesecret`).pipe(
            catchError(this.handleError)
        )
    }

    // verify verification code
    verifyVerificationCode(code): Observable<any> {
        return this.http.post(`${environment.API_URL}/communication/verifyverificationcode`, code).pipe(
            catchError(this.handleError)
        )
    }

    updateVanCustStatus(code): Observable<any> {
        return this.http.put(`${environment.API_URL}/auth/updateStatus`, code).pipe(
            catchError(this.handleError)
        )
    }

    // verify verification code
    sendEmailAfterPwdConfirmation(data): Observable<any> {
        return this.http.post(`${environment.API_URL}/sendgrid/sendEmailAfterPwdConfirmation`, data).pipe(
            catchError(this.handleError)
        )
    }

    // verify verification code
    sendEmailAfterPwdConfirmationForLead(data): Observable<any> {
        return this.http.post(`${environment.API_URL}/sendgrid/sendEmailAfterPwdConfirmationForLead`, data).pipe(
            catchError(this.handleError)
        )
    }

    // send Email After Payment Success
    sendEmailAfterPaymentSuccess(data): Observable<any> {
        return this.http.post(`${environment.API_URL}/sendgrid/sendEmailAfterPaymentSuccess`, data).pipe(
            catchError(this.handleError)
        )
    }

    // get Categories
    getCategories(): Observable<any> {
        return this.http.get(`${environment.API_URL}/sendgrid/getCategories`).pipe(
            catchError(this.handleError)
        )
    }

    // get SubCategories
    getSubCategories(): Observable<any> {
        return this.http.get(`${environment.API_URL}/sendgrid/getSubCategories`).pipe(
            catchError(this.handleError)
        )
    }

    // get SubCategories
    getSubCategoriesData(cat_code): Observable<any> {
        return this.http.get(`${environment.API_URL}/sendgrid/getSubCategoriesData/${cat_code}`).pipe(
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
