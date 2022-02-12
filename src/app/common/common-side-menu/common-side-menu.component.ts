import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  SUCCESS_CODE,
  UNAUTHORIZED_CODE,
  INTERNAL_SERVER_ERROR_MSG,
  PAGE_MODE_CREATE
} from '../../helpers/constants'
@Component({
  selector: 'app-common-side-menu',
  templateUrl: './common-side-menu.component.html',
  styleUrls: ['./common-side-menu.component.scss']
})
export class CommonSideMenuComponent{
  rightArrow:boolean=false
  public loginId:any;
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleSidebarToggle = () => {
    this.rightArrow=true
    this.toggleSidebar.emit(!this.isExpanded);

  }
  emailId: any;
  constructor(
    public route: ActivatedRoute,  
    public router: Router,
    ) { }
  ngOnInit(): void {
    this.loginId=this.route.snapshot.params.id
    console.log("🚀 ~ file: common-side-menu.component.ts ~ line 31 ~ CommonSideMenuComponent ~ this.loginId", this.loginId)
    this.loginId=localStorage.getItem('loginId')
    this.emailId=localStorage.getItem('emailId')
    //console.log("🚀 ~ file: common-side-menu.component.ts ~ line 27 ~ CommonSideMenuComponent ~  this.loginId",  this.loginId)
  }
  Logout(){
    window.location.href=`http://topproz2.s3-website-us-east-1.amazonaws.com/auth/signin`
  }
}
