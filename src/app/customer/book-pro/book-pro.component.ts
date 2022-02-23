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

@Component({
  selector: 'app-book-pro',
  templateUrl: './book-pro.component.html',
  styleUrls: ['./book-pro.component.scss']
})
export class BookProComponent implements OnInit {

  public currentDate: any;
  bookProform: FormGroup;
  workOrdeList: any;
  projectName
  emailId:any;
  customerId: any;
  businessName: any;
  proProfile: any;
  serviceArea: any;
  dateTimeData: any;
  zipcodelength: boolean = false;
  zipcodeData1: any;
  city: any;
  zipcode: any;
  zipcodeData: any;
  zipCodeStateData: any;
  zipcodeExists: boolean = false;
  stateName: any;
  state: any;
  flagStatus: any = 'all';
  woServiceAddress: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public leadService: LeadService,
    private toastr: ToastrManager,
    private router: Router

  ) {
    this.bookProform = this.buildFormGroup({})
  }

  ngOnInit(): void {
    this.getProProfile(this.route.snapshot.params.id)
    this.currentDate = moment(new Date()).format("YYYY-MM-DD");
    this.emailId=localStorage.getItem('emailId')

    this.leadService.getUserProfile(this.emailId).subscribe((data) => {
      if (data.status == 200) {
        let userProfileData = { ...data['data'][0] }
        this.customerId=userProfileData.customerId
        this.getWorkOrderListBasedOnCustomer(this.customerId)
        this.getWOServiceAddress(this.customerId)
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
        this.serviceArea=this.proProfile.serviceArea
        this.dateTimeData=this.proProfile.businessHours
        this.businessName=this.proProfile.businessName
        //this.imgPath = this.proProfile.attachments
        console.log("🚀 ~ file: mypro-view.component.ts ~ line 39 ~ MyproViewComponent ~ this.serviceArea", this.serviceArea)
      }
    })
  }

  getWOServiceAddress(customerId) {

    this.leadService.workorderServiceAddressData(customerId)
      .pipe(first())
      .subscribe((data) => {

        if (data.status == SUCCESS_CODE) {
          this.woServiceAddress = data.data;
          console.log(this.woServiceAddress);          
        } else if (data.status == 404) {
          this.woServiceAddress = []
        }
        else if (data.status == UNAUTHORIZED_CODE) {
        }
      }, (error) => {
        this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
      })
  }

  private buildFormGroup(formData): any {
    const bookProform = {
      customerId: [this.customerId],
      workOrderNumber: [''],
      emailId: ['h1@sunkpo.com'],
      createdOn: [''],
      projectName: [''],
      projectDescription: [''],
      resolution: [''],
      resolutiondate: [''],
      resolutionby: [''],
      status: ["Open"],
      streetAddress: [formData.ServiceAddress?.streetAddress],
      city: [formData.ServiceAddress?.city],
      state: [formData.ServiceAddress?.state],
      zipCode: [formData.ServiceAddress?.zipcode],
    };
    return this.fb.group(bookProform)
  }

  onSubmit() {
    if (!this.bookProform.valid) {
      alert('Please fill all the required fields to create a super hero!')
    } else {
      console.log(this.bookProform.value)
      this.bookProform.patchValue({
        customerId: this.customerId
      })
      this.leadService.createCustomerSupportRequest(this.bookProform.value)
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
   this.bookProform.patchValue({
    projectName: gg[0].WorkDescription.jobTitle,
    createdOn:gg[0].WorkDescription.createdOn
    
  })
   //this.customerSupportRequestform.customerSupportRequestform=
   console.log("🚀 ~ file: customer-support-request-form.component.ts ~ line 92 ~ CustomerSupportRequestFormComponent ~ gg", gg)
  }


  getServiceCheck1(flagStatus) {
    if (flagStatus == 'NO') {
      // this.serviceAddressForm.reset()
      this.bookProform.enable();
      this.bookProform.controls['servicezipcode'].disable();
      this.bookProform.controls['servicestreetAddress'].disable();
      this.bookProform.controls['serviceadminNotes'].disable();
      this.bookProform.controls['servicezipcode'].disable();
      this.bookProform.controls['servicestreetAddress'].disable();
    }
    else {
      this.bookProform.reset()
      this.bookProform.disable()
    }
  }


  getZipcodeData(zipcode) {
    // if (zipcode == "") {
    //   this.zipcodeExists = false
    //   this.zipcodelength = false
    //   this.stateName = ""
    //   this.city = ""
    // }
    // else if (zipcode?.length < 5) {
    //   console.log('called')
    //   this.zipcodelength = true
    //   this.zipcodeExists = false
    //   this.stateName = ""
    //   this.city = ""
    // }
    if (zipcode?.length == 5) {
      this.zipcodelength = false
      this.leadService.getZipcodeData(zipcode).subscribe((data) => {
        if (data.status == 200) {
          this.zipcodeExists = false
          this.zipcodeData1 = data['data']
          this.zipcodeData = data['data'][0]
          this.city = this.zipcodeData?.city
          this.state = this.zipcodeData?.state
          // this.editGoogleAddress.get('city').setValue(this.city)
          // this.editYelpAddress.get('city').setValue(this.city)
          //fixed on 31.08.2021 to avoid rating and business address changining
          // this.getYelpRating();
          // this.getGoogleRating();
          this.getZipcodeStateName();
        } if (this.zipcodeData1?.length == 0) {
          this.zipcodeExists = true
          this.zipcodelength = false
        }
      })
    }
  }

  getZipcodeStateName() {
    this.leadService.getZipcodesState(this.state)
      .subscribe((data) => {
        if (data.status == 200) {
          this.zipCodeStateData = data['data'][0]
          this.stateName = this.zipCodeStateData?.stateName
          this.bookProform.patchValue({
            state: this.stateName ? this.stateName : this.state,
            city: this.city
          })

        }
        if (data.status == 404) {
          this.zipcodeExists = true
        }
      }, (error) => {
        this.zipcodeExists = true
        //this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
      })
  }
}
