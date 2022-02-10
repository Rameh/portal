import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-common-header',
  templateUrl: './common-header.component.html',
  styleUrls: ['./common-header.component.scss']
})
export class CommonHeaderComponent implements OnInit {
  public headerInformation: any;
  cookieValue = '';
  imageUrl: string | null | undefined;
  constructor(public authService: AuthService,public cookieService: CookieService) { 
    const helper = new JwtHelperService();
    console.log('cookies',document.cookie)
    this.cookieValue = this.cookieService.get('X-Auth-Token');
    console.log("🚀this.cookieValue",   this.cookieValue)
    this.headerInformation = helper.decodeToken(this.authService.currentUserValue.token)
    console.log("🚀 ~ file: common-header.component.ts ~ line 16 ~ CommonHeaderComponent ~ this.headerInformation", this.headerInformation)
  }

  ngOnInit(): void {
    this.imageUrl="../../../assets/images/account.png"
    console.log("🚀 ~ file: common-header.component.ts ~ line 26 ~ CommonHeaderComponent ~  this.imageUrl",  this.imageUrl)
  }


}
