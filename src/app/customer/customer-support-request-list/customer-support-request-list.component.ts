import { Component, OnInit } from '@angular/core';
import {
  SUCCESS_CODE,
  UNAUTHORIZED_CODE,
  INTERNAL_SERVER_ERROR_MSG,
} from '../../helpers/constants';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-customer-support-request-list',
  templateUrl: './customer-support-request-list.component.html',
  styleUrls: ['./customer-support-request-list.component.scss']
})
export class CustomerSupportRequestListComponent implements OnInit {

  public leadsList: any;
  public loginId: any;
  emailId: any;
  customerId: any;
  pagination: number = 1;
  constructor(
    public leadService: LeadService,
    public route: ActivatedRoute,
    public router: Router,
    private toastr: ToastrManager
  ) { }

  ngOnInit(): void {
    this.loginId = this.route.snapshot.params.loginId
    this.emailId = localStorage.getItem('emailId')
    this.leadService.getUserProfile(this.emailId)
      .subscribe((data) => {
        if (data.status == 200) {
          let userProfileData = { ...data['data'][0] }
          this.customerId = userProfileData.customerId
          this.getLeadListPro(this.customerId)
        }
      })
  }

  getLeadListPro(customerId) {
    this.leadService.getCustomerSupportList(customerId)
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
