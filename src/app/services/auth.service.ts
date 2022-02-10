import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

import { environment } from '../../environments/environment';
import { User } from '../modals/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public isUserLoggedin: Observable<boolean>;
  public isUserLoggedinSubject: BehaviorSubject<boolean>;
  private CURRENT_USER = "currentUser";
  constructor(
    private http: HttpClient,
    public router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser") || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();

    this.isUserLoggedinSubject = new BehaviorSubject<boolean>(this.isLoggedIn);
    this.isUserLoggedin = this.isUserLoggedinSubject.asObservable();
  }


  //login service
  login(credentials: User) {
    return this.http.post<any>(`${environment.API_URL}/auth/signin`, credentials)
      .pipe(map(user => {
        if (user.data) {
          console.log(user.data)
          if (this.isTokenExpired(user.data.token)) {
            return null;
          } else {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify({
              token: user.data.token
            }));
            sessionStorage.setItem('key',  JSON.stringify({
              token: user.data.token
            }));
            this.currentUserSubject.next(user.data);
            return user;
          }
        } else {
          return user;
        }
      }));
  }

  // register service
  register(user: User): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/signup`, user).pipe(
      catchError(this.handleError)
    )
  }

  // get user profile
  getUserProfile(id): Observable<any> {
    return this.http.get<User>(`${environment.API_URL}/auth/getUserProfile/${id}`);
  }

  // get user profile
  CheckProStatus(id): Observable<any> {
    return this.http.get<User>(`${environment.API_URL}/auth/CheckProStatus/${id}`);
  }

  // get login roles and permissions
  getUserRolesAndPermissionsFromLogin(id, role): Observable<any> {
    return this.http.get<User>(`${environment.API_URL}/auth/getloginrolesandpermissions/${id}/${role}`);
  }

  // get login roles and permissions
  getUserRolesFromLogin(id): Observable<any> {
    return this.http.get<User>(`${environment.API_URL}/auth/getloginroles/${id}`);
  }

  // emailid verifier
  verifyEmailId(emailId): Observable<any> {
    return this.http.get<User>(`${environment.API_URL}/auth/emailIdVerifier/${emailId}`);
  }

  // update role permissions
  updateRolePermissions(id, role, permissions): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/auth/updaterolepermissions/${id}/${role}`, permissions).pipe(
      catchError(this.handleError)
    )
  }

  // update user profile
  updateUserProfile(user: User, id): Observable<any> {
    return this.http.put<User>(`${environment.API_URL}/auth/updateUserProfile/${id}`, user).pipe(
      catchError(this.handleError)
    )
  }

  // logout service
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    //if (this.currentUserSubject) this.currentUserSubject.next(user:any);
    if (this.isUserLoggedinSubject) this.isUserLoggedinSubject.next(false);
    this.router.navigate(['/welcome'])
  }

  // is logged in verifier
  public get isLoggedIn(): boolean {
    if (this.currentUserSubject) {
      const userData = this.currentUserSubject.value;
      if (userData) {
        const helper = new JwtHelperService();
        const myRawToken = userData.token;
        if (myRawToken) {
          const isTokenExpired = helper.isTokenExpired(myRawToken);
          if (!isTokenExpired) return true;
        }
      }
    }
    // if the token expired, remove the token
    //this.logout();
    return false;
  }

  updateLoginStatus(obj): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/auth/updateLoginStatus`, obj).pipe(
      catchError(this.handleError)
    )
  }
  updateProfileImage(obj): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/auth/updateProfileImage`, obj).pipe(
      catchError(this.handleError)
    )
  }

  // get access token
  public get accessToken(): String {
    if (this.currentUserSubject && this.currentUserSubject.value && this.currentUserSubject.value.token)
      return this.currentUserSubject.value.token;

    return 'null';
  }

  // current user value
  public get currentUserValue(): any {
    if (this.currentUserSubject) return this.currentUserSubject.value;
    else return 'null';
  }
  //update leadgen Flag
  updateLeadFlag(obj): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/auth/updateRegStatus`, obj).pipe(
      catchError(this.handleError)
    )
  }
  updateVanFlag(obj): Observable<any> {
    return this.http.put<any>(`${environment.API_URL}/auth/updateVanRegFlag`, obj).pipe(
      catchError(this.handleError)
    )
  }

  checkemailId(emailId): Observable<any>{
    return this.http.get<any>(`${environment.API_URL}/auth/checkemailId/${emailId}`)
  }

  // is token expireds
  public isTokenExpired(rawToken: string): boolean {
    if (rawToken) {
      const helper = new JwtHelperService();
      const isTokenExpired = helper.isTokenExpired(rawToken);
      if (isTokenExpired) return true;
    }
    return false;
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