import { Component, OnInit } from '@angular/core';
import { LeadService } from '../../services/lead.service';
import {
  DEFAULT_PERSON_IMAGE,
  SUCCESS_CODE,
  UNAUTHORIZED_CODE,
  INTERNAL_SERVER_ERROR_MSG,
  ALREADY_EXIST_CODE
} from '../../helpers/constants';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-lead-list',
  templateUrl: './customer-lead-list.component.html',
  styleUrls: ['./customer-lead-list.component.scss']
})
export class CustomerLeadListComponent implements OnInit {

  public leadsList:any;
  public loginId:any;
  proProfile: any;
  emailId: any;
  pagination: number = 1;
  customerId: any;
  constructor(
    public leadService: LeadService, 
    public route: ActivatedRoute,  
    public router: Router,
    private toastr: ToastrManager
    ) { }

  ngOnInit(): void {
    this.loginId=this.route.snapshot.params.id
    this.emailId=this.route.snapshot.params.emailId
    //console.log('lohiiiiii>>>>>>>>>',this.route.snapshot.params.id)
    //localStorage.setItem()
    //localStorage.setItem("proId", JSON.stringify(this.proId));
    localStorage.setItem("loginId",this.loginId);
    localStorage.setItem("emailId",this.emailId)
    this.emailId=localStorage.getItem('emailId')
    this.leadService.getUserProfile(this.emailId)
    .subscribe((data) => {
      if (data.status == 200) {
        let userProfileData = { ...data['data'][0] }
        this.customerId=userProfileData.customerId
        console.log("CustomerSupportRequestListComponent ~ userProfileData", this.customerId)
        this.getLeadListPro(this.customerId)
        //this.customerName=userProfileData.CustomerBillingAddress.firstName+' '+userProfileData.CustomerBillingAddress.lastName
      }
    })
    //this.getLeadListPro()
  }

  // getProDetails() {
  //   //console.log("prodetails")
  //   console.log('this.headerInformation.id',this.loginId.id)
  //   this.leadService.getProProfile(this.loginId.id).subscribe((data) => {
  //     if (data.status == SUCCESS_CODE) {
  //       this.proProfile = { ...data['data'] }
  //      console.log('8888888888888',this.proProfile)
  //     }
  //   }, (error) => {
  //   })
  // }

  getLeadListPro(customerId) {
    this.leadService.getProjectList(customerId)
      .subscribe((data) => {
        if (data.status == SUCCESS_CODE) {
          this.leadsList = data.data
          console.log("this.leadsList", this.leadsList)
        } else if (data.status == UNAUTHORIZED_CODE) {
        }
      }, (error) => {
        this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
      })
  }

  viewLead(data) {
    this.router.navigate(['/customer/project-view'], { queryParams: { customerId: data.customerId } })
  }

}
