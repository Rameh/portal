import { Component, OnInit } from '@angular/core';
import { LeadService } from '../../services/lead.service';
import {
  SUCCESS_CODE,
  UNAUTHORIZED_CODE,
  INTERNAL_SERVER_ERROR_MSG,
} from '../../helpers/constants';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-estimate-list',
  templateUrl: './customer-estimate-list.component.html',
  styleUrls: ['./customer-estimate-list.component.scss']
})
export class CustomerEstimateListComponent implements OnInit {
  public leadsList:any;
  public loginId:any;
  proProfile: any;
  emailId: any;
  pagination: number = 1;
  customerId: any;
  customerEmailId: any;
  constructor(
    public leadService: LeadService, 
    public route: ActivatedRoute,  
    public router: Router,
    private toastr: ToastrManager
    ) { }

  ngOnInit(): void {
    this.loginId=this.route.snapshot.params.id
    this.customerEmailId=this.route.snapshot.params.emailId
    console.log('88888888888888888888888888888888888',this.emailId)
    if(!this.emailId){
    localStorage.setItem("loginId",this.loginId);
    localStorage.setItem("emailId",this.customerEmailId)
    }
    this.getLeadListPro();
    this.emailId=localStorage.getItem('emailId')
    this.leadService.getUserProfile(this.customerEmailId)
    .subscribe((data) => {
      if (data.status == 200) {
        let userProfileData = { ...data['data'][0] }
        this.customerId=userProfileData.customerId
        console.log("CustomerSupportRequestListComponent ~ userProfileData", this.customerId)
        this.getLeadListPro()
      }
    })
  }
  getLeadListPro() {
    this.leadService.getEstimateList('CU20211194821')
      .subscribe((data) => {
        if (data.status == SUCCESS_CODE) {
          this.leadsList = data.data
          console.log("CustometEstimateListComponent ~ this.leadsList", this.leadsList)
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

