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
  selector: 'app-customer-project-list',
  templateUrl: './customer-project-list.component.html',
  styleUrls: ['./customer-project-list.component.scss']
})
export class CustomerProjectListComponent implements OnInit {

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
    if(!this.emailId){
    localStorage.setItem("loginId",this.loginId);
    localStorage.setItem("emailId",this.customerEmailId)
    }
    this.emailId=localStorage.getItem('emailId')
    this.leadService.getUserProfile(this.customerEmailId)
    .subscribe((data) => {
      if (data.status == 200) {
        let userProfileData = { ...data['data'][0] }
        this.customerId=userProfileData.customerId
        this.getLeadListPro(this.customerId)
      }
    })
    //this.getLeadListPro()
  }

  getLeadListPro(customerId) {
    this.leadService.getProjectList(customerId)
      .subscribe((data) => {
        if (data.status == SUCCESS_CODE) {
          this.leadsList = data.data
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
