import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { LeadService } from 'src/app/services/lead.service';
import {
  DEFAULT_PERSON_IMAGE,
  SUCCESS_CODE,
  UNAUTHORIZED_CODE,
  INTERNAL_SERVER_ERROR_MSG,
  ALREADY_EXIST_CODE
} from '../../helpers/constants';
@Component({
  selector: 'app-customer-support-request-form',
  templateUrl: './customer-support-request-form.component.html',
  styleUrls: ['./customer-support-request-form.component.scss'],
  providers: [DatePipe]
})
export class CustomerSupportRequestFormComponent implements OnInit {

  public currentDate: any;
  customerSupportRequestform: FormGroup;
  workOrdeList: any;
  projectName
  constructor(
    private fb: FormBuilder,
    public leadService: LeadService,
    private toastr: ToastrManager,
    private router: Router

  ) {
    this.customerSupportRequestform = this.buildFormGroup({})
  }

  ngOnInit(): void {
    this.currentDate = moment(new Date()).format("YYYY-MM-DD");
    this.getWorkOrderListBasedOnCustomer()
  }

  private buildFormGroup(formData): any {
    const customerSupportRequestform = {
      customerId: ['CU20221266466'],
      workOrderNumber: [''],
      emailId: ['h1@sunkpo.com'],
      date: [moment().format('DD-MM-YYYY')],
      projectName: [''],
      projectDescription: [''],
      resolution: [''],
      resolutiondate: [''],
      resolutionby: [''],
      status: ["Open"]
    };
    return this.fb.group(customerSupportRequestform)
  }

  onSubmit() {
    if (!this.customerSupportRequestform.valid) {
      alert('Please fill all the required fields to create a super hero!')
    } else {
      console.log(this.customerSupportRequestform.value)
      this.leadService.createCustomerSupportRequest(this.customerSupportRequestform.value)
        .pipe(first())
        .subscribe(
          data => {
            if (data.status == 200) {
              this.toastr.successToastr(data.response, 'Customer Support Request')
              this.router.navigateByUrl('/customer/support-list')
            }
          }, error => {
            this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
          });
    }
  }

  getWorkOrderListBasedOnCustomer(){
    this.leadService.getWorkOrderListByCustomer('CU2022246763')
    .subscribe((data) => {
      if (data.status == SUCCESS_CODE) {
        this.workOrdeList = data.data
        console.log("this.wokrOrderList", this.workOrdeList)
      } else if (data.status == UNAUTHORIZED_CODE) {
      }
    }, (error) => {
      this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
    })
  }

  getWorkOrderData(value) {    
   const gg= this.workOrdeList.filter(o=>o.workOrderNumber === value)
   console.log('fff',gg[0].WorkDescription.jobTitle)
   this.customerSupportRequestform.patchValue({
    projectName: gg[0].WorkDescription.jobTitle
  })
   //this.customerSupportRequestform.customerSupportRequestform=
   console.log("🚀 ~ file: customer-support-request-form.component.ts ~ line 92 ~ CustomerSupportRequestFormComponent ~ gg", gg)
  }
}
