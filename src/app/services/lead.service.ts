import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LeadService {

    constructor(private http: HttpClient) { }


      // get pro profile
  getProProfile(id): Observable<any> {
    return this.http.get(`${environment.API_URL}/pro/getproprofile/${id}`);
  }

    getProjectList(loginId: any): Observable<any> {
        return this.http.get(`${environment.API_URL}/mobile_workOrder/getStaffCustomerWorkOrderList/${loginId}`).pipe(
            catchError(this.handleError)
        )
    }
    getUserProfile(id): Observable<any> {
        return this.http.get<any>(`${environment.API_URL}/customer/getCustomerProfileDeatils/${id}`);
    }
    getLeadDetails(customerId: string): Observable<any> {
        return this.http.get<any>(`${environment.API_URL}/workorder/getworkorderprofile/${customerId}`);
    }


    getProjectHistory(loginId: any): Observable<any> {
        return this.http.get(`${environment.API_URL}/woStatushistory/getworkorderStatusHistory/${loginId}`).pipe(
            catchError(this.handleError)
        )
    }
    changePassword(data): Observable<any> {
        return this.http.put<any>(`${environment.API_URL}/auth/changePasswordNew`, data).pipe(
            catchError(this.handleError)
        )
    }
    getNotification(): Observable<any> {
        return this.http.get<any>(`${environment.API_URL}/notification/getNotificationsByEmailId/firebase@sunkpo.com`);
    }

    getZipcodeData(zipcode: string): Observable<any> {
        return this.http.get(`${environment.API_URL}/master/getzipcodedata/${zipcode}`);
    }
    getZipcodesState(stateCode): Observable<any> {
        return this.http.get(`${environment.API_URL}/master/getzipcodestatesData/${stateCode}`);
    }
    updateCustomerProfile(customerEmailId, updatedCustomerProfile): Observable<any> {
        return this.http.put(`${environment.API_URL}/customer/updateCustProfile/${customerEmailId}`, updatedCustomerProfile).pipe(
            catchError(this.handleError)
        )
    }
    updateCustomerNotification(notificationId, updatedNotification): Observable<any> {
        return this.http.put(`${environment.API_URL}/notification/DeleteNotificationFlag/${notificationId}`, updatedNotification).pipe(
            catchError(this.handleError)
        )
    }

    getCustomerSupportList(customerId: any): Observable<any> {
        return this.http.get(`${environment.API_URL}/csr/get-csr-list/${customerId}`).pipe(
            catchError(this.handleError)
        )
    }

    
    getWorkOrderListByCustomer(customerId: any): Observable<any> {
        return this.http.get(`${environment.API_URL}/Workorder/get-customer-work-orders/${customerId}`).pipe(
            catchError(this.handleError)
        )
    }
    createCustomerSupportRequest(customerSupportRequestData): Observable<any> {
        return this.http.post(`${environment.API_URL}/csr/create-csr`, customerSupportRequestData).pipe(
            catchError(this.handleError)
        )
    }

    getSupportRequestDetails(ticketNumber){
        return this.http.get<any>(`${environment.API_URL}/csr/get-ticketNumber-csr-list/${ticketNumber}`);
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
