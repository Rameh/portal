import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss']
})
export class CommonHeaderComponent implements OnInit {
  public headerInformation: any;
  cookieValue = '';
  imageUrl: string | null | undefined;
  emailId: any;
  customerName: any;
  customerId: any;
  constructor(public authService: AuthService,public cookieService: CookieService, 
    public leadService: LeadService
    ) { 
    const helper = new JwtHelperService();
    console.log('cookies',document.cookie)
    this.cookieValue = this.cookieService.get('X-Auth-Token');
    console.log("🚀this.cookieValue",   this.cookieValue)
    this.headerInformation = helper.decodeToken(this.authService.currentUserValue.token)
    console.log("🚀 ~ file: common-header.component.ts ~ line 16 ~ CommonHeaderComponent ~ this.headerInformation", this.headerInformation)
  }

  ngOnInit(): void {
    this.emailId=localStorage.getItem('emailId')
    if(!this.emailId){
      //window.location.reload()
    }
    this.leadService.getUserProfile(this.emailId)
    .subscribe((data) => {
      if (data.status == 200) {
        let userProfileData = { ...data['data'][0] }
        this.customerName=userProfileData.CustomerBillingAddress.firstName+' '+userProfileData.CustomerBillingAddress.lastName
        this.customerId=userProfileData.customerId
      }
    })
    this.imageUrl="../../../assets/images/account.png"
    console.log("🚀 ~ file: common-header.component.ts ~ line 26 ~ CommonHeaderComponent ~  this.imageUrl",  this.imageUrl)
  }

  Logout(){
    localStorage.removeItem('emailId')
    window.location.replace('http://topproz2.s3-website-us-east-1.amazonaws.com');
    window.location.href=`http://topproz2.s3-website-us-east-1.amazonaws.com/auth/signin`
  }

}
