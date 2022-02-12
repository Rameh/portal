import { Component, OnInit } from '@angular/core';
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
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-customer-support-request-list',
  templateUrl: './customer-support-request-list.component.html',
  styleUrls: ['./customer-support-request-list.component.scss']
})
export class CustomerSupportRequestListComponent implements OnInit {

    public leadsList:any;
    public loginId:any;
  emailId:any;
  customerId: any;
    constructor(
      public leadService: LeadService, 
      public route: ActivatedRoute,  
      public router: Router,
      private toastr: ToastrManager
      ) { }
  
    ngOnInit(): void {
      this.loginId=this.route.snapshot.params.loginId
      //localStorage.setItem()
      //localStorage.setItem("proId", JSON.stringify(this.proId));
      localStorage.setItem("loginId",this.loginId);
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
      
    }
  
  
    // getProDetails() {
    //   //console.log("prodetails")
    //   console.log('this.headerInformation.id',this.loginId.id)
    //   this.leadService.getProProfile(this.headerInformation.id).subscribe((data) => {
    //     if (data.status == SUCCESS_CODE) {
    //       this.proProfile = { ...data['data'] }
         
    //     }
    //   }, (error) => {
    //   })
    // }
  
  
  
  
  
  
  
  
  
    getLeadListPro(customerId) {
      this.leadService.getCustomerSupportList(customerId)
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
      // this.customerLeadId = data.leadId
      this.router.navigate(['/customer/project-view'], { queryParams: { customerId: data.customerId } })
      // console.log("data VIEW  SHYAM", data.proLoginId)
    }
  
  }
  