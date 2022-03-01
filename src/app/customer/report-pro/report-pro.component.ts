import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
declare var $: any;
@Component({
  selector: 'app-report-pro',
  templateUrl: './report-pro.component.html',
  styleUrls: ['./report-pro.component.scss']
})
export class ReportProComponent implements OnInit {

  public currentDate: any;
  reportProform: FormGroup;
  workOrdeList: any;
  projectName
  emailId:any;
  customerId: any;
  proProfile: any;
  businessName: any;
  constructor(
    private fb: FormBuilder,
    public leadService: LeadService,
    private toastr: ToastrManager,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.reportProform = this.buildFormGroup({})
  }

  ngOnInit(): void {
    this.getProProfile(this.route.snapshot.params.id)
    this.currentDate = moment(new Date()).format("YYYY-MM-DD");
    this.emailId=localStorage.getItem('emailId')
    this.leadService.getUserProfile(this.emailId)
    .subscribe((data) => {
      if (data.status == 200) {
        let userProfileData = { ...data['data'][0] }
        this.customerId=userProfileData.customerId
        this.getWorkOrderListBasedOnCustomer(this.customerId)
        console.log("🚀 ~ file: customer-support-request-list.component.ts ~ line 41 ~ CustomerSupportRequestListComponent ~ userProfileData", userProfileData)
        //this.customerName=userProfileData.CustomerBillingAddress.firstName+' '+userProfileData.CustomerBillingAddress.lastName
      }
    })
  }

  getProProfile(proId){
    //this.customerEmailId=localStorage.getItem('emailId')
    this.leadService.getProProfile(proId)
    .subscribe((data) => {
      if (data.status == 200) {
        this.proProfile = { ...data['data'] }
        console.log("proprofile",  this.proProfile)
        this.leadService.proData=this.proProfile
        this.businessName=this.proProfile.businessName
        //this.imgPath = this.proProfile.attachments
      }
    })
  }

  private buildFormGroup(formData): any {
    const customerSupportRequestform = {
      customerId: [this.customerId],
      workOrderNumber: [''],
      emailId: ['h1@sunkpo.com'],
      createdOn: [''],
      projectName: [''],
      projectDescription: [''],
      reviewComments:[''],
      resolution: [''],
      resolutiondate: [''],
      resolutionby: [''],
      isNeverShowedUp:[false],
      isShowedUpTooLate:[false],
      isAbusiveBehavior:[false],
      isDoNotLookProfessional:[false],
      isOtherReason:[false],
      proName:[''],
      proEmailId:[''],
      status:['Open']
    };
    return this.fb.group(customerSupportRequestform)
  }

  onSubmit() {
    if (!this.reportProform.valid) {
      alert('Please fill all the required fields to create a super hero!')
    } else {
      console.log(this.reportProform.value)
      this.reportProform.patchValue({
        customerId: this.customerId,
        proName:this.businessName,
        proEmailId:this.proProfile.emailId
      })
      this.leadService.createReportPro(this.reportProform.value)
        .pipe(first())
        .subscribe(
          data => {
            if (data.status == 200) {
              this.toastr.successToastr(data.response, 'Report Pro')
              $("#forgotPassword3").modal("show");
              this.router.navigateByUrl('/my-pros-view/618ae544538367663cc10fcc')
            }
          }, error => {
            this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
          });
    }
  }

  getWorkOrderListBasedOnCustomer(customerId){
    this.leadService.getWorkOrderListByCustomer(customerId)
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
   this.reportProform.patchValue({
    projectName: gg[0].WorkDescription.jobTitle,
    createdOn:gg[0].WorkDescription.createdOn
    
  })
   //this.customerSupportRequestform.customerSupportRequestform=
   console.log("🚀 ~ file: customer-support-request-form.component.ts ~ line 92 ~ CustomerSupportRequestFormComponent ~ gg", gg)
  }


  async newPassword1() {
   
  }
}

