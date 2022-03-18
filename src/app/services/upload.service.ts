import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  // file upload
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('image', file);
    const req = new HttpRequest('POST', `${environment.API_URL}/fileUpload/customer-imageUploader`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  uploadMultiple(file: File[]): Observable<HttpEvent<any>> {
    //console.log("multiple images Service")
    const formData: FormData = new FormData();
    for(let k=0;k<file.length;k++){
      formData.append('images', file[k]);
    }   
    const req = new HttpRequest('POST', `${environment.API_URL}/fileupload/customer-multipleImageUploader`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
}
