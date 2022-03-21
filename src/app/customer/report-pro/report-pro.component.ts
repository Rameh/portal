import { DatePipe } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { LeadService } from 'src/app/services/lead.service';
import { UploadService } from 'src/app/services/upload.service';
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
  logoFlag1: boolean = false;
  logoFlag2: boolean=false;
  checkFlag1: boolean = false;
  selectedFilesCompanyLogo1: FileList[] | undefined;
  selectedFiles: FileList | undefined;
  h: any;
  filesToUpload: any= [];
  checkValueFlag: boolean = false;
  progressCompanyLogo2 = 0;
  disableSaveOnFileUpload: boolean=false;
  selectFileUpload: boolean=false;
  btnFlag: boolean=false;
  proProfileImage: any;
  resArr: any;
  uploadMessageCompanyLogo1 = '';
  arr: any=[];
  totalLength: any;
  imageArray: any;
  progressHide1: boolean=false;
  chosseTypecount: any;
  fileName='';
  imgFlag: boolean=false;
  proProfileImage1: any = [];
  urls: any=[];
  constructor(
    private fb: FormBuilder,
    public leadService: LeadService,
    public uploadService: UploadService,
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
    //'hatim.naim@gmail.com'
    this.leadService.getUserProfile('hatim.naim@gmail.com')
    .subscribe((data) => {
      if (data.status == 200) {
        let userProfileData = { ...data['data'][0] }
        this.customerId=userProfileData.customerId
        this.getWorkOrderListBasedOnCustomer(this.customerId)
        //console.log("🚀 ~ file: customer-support-request-list.component.ts ~ line 41 ~ CustomerSupportRequestListComponent ~ userProfileData", userProfileData)
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
    this.leadService.getWorkOrderListByProIdAndCustomerId(this.route.snapshot.params.id,customerId)
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


  // on file select
  selectFiles(fileInput) {
    console.log("testtttttttt", fileInput)
    this.btnFlag = false;
    this.selectFileUpload = true;
    this.checkFlag1 = true;
    this.logoFlag2 = false;
    this.logoFlag1 = false;
    this.selectedFilesCompanyLogo1 = fileInput.target.files;
    console.log(" this.selectedFilesCompanyLogo1 ", this.selectedFilesCompanyLogo1 )
    //this.totalLength = this.filesToUpload.length
    //console.log("🚀this.totalLength",  this.totalLength)
    this.imageArray = []
    this.progressHide1 = false
    if (fileInput.target.files.length == 1) {
      this.filesToUpload.push(fileInput.target.files[0])
      this.logoFlag1 = true;
      this.chosseTypecount = this.filesToUpload.length
    } else {
      for (var i = 0; i < fileInput.target.files.length; i++) {
        this.filesToUpload.push(fileInput.target.files[i])
        this.chosseTypecount = this.filesToUpload.length
        this.fileName = "files"
      }
    }
    var filesAmount = fileInput.target.files.length;
    for (let i = 0; i < filesAmount; i++) {
      const fileType= fileInput.target.files[i].type
      var reader = new FileReader();
      reader.onload = (fileInput: any) => {
        this.imgFlag = false;
        this.urls.push(fileInput.target.result);
        this.arr.push({imageBase64:fileInput.target.result,type:fileType});
        
        //this.proProfileImage3 = this.proProfileImage1.concat(this.arr);
        //console.log("p1", this.proProfileImage1)
        console.log("arr", this.arr)
        //console.log("p3", this.proProfileImage3)
      }
      reader.readAsDataURL(fileInput.target.files[i]);
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    // //console.log("selectedFiles", this.selectedFiles)
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.h = event.target.files[0].name;
      // //console.log("selectedFiles:::", this.h)     
    }
  }



  upload() {
    this.logoFlag1 = false;
    if (this.filesToUpload.length == 0) {
      this.logoFlag2 = true;
    } else {
      this.logoFlag1 = true;
      this.checkValueFlag = true
      this.progressCompanyLogo2 = 0;
      this.disableSaveOnFileUpload = true;
      this.selectFileUpload = false;
      const files: Array<File> = this.filesToUpload;
      console.log("🚀 ~ file: report-pro.component.ts ~ line 229 ~ ReportProComponent ~ files", files)
      // this.currentFileCompanyLogo = this.filesToUpload;
      this.uploadService.uploadMultiple(files)
        .subscribe(
          (event:any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressCompanyLogo2 = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.btnFlag = true;
              event.body.status == 200 ? this.arr = event.body.data.uploadedImagePath : this.proProfileImage
              this.disableSaveOnFileUpload = false;
              this.resArr = event['body'];
              this.logoFlag1 = false;
              this.uploadMessageCompanyLogo1 = 'Pictures Uploaded Successfully';
              let resArr1 = this.resArr['data'];
              console.log("res",this.resArr)
              this.resArr = (resArr1['uploadedImagePath'])
              console.log('this.filesToUpload',this.filesToUpload)
              for (let y = 0; y < this.filesToUpload.length; y++) {
                const imageType=this.resArr[y].mimetype;
                this.proProfileImage1.push({Imageurl:this.resArr[y].location,type:imageType});
              }
              console.log("p1???????????", this.proProfileImage1)
              //console.log("arr", this.arr)
              //console.log("p3", this.proProfileImage3)
            }
          },
          err => {
            this.progressCompanyLogo2 = 0;
            this.uploadMessageCompanyLogo1 = 'Could not upload the file!';
            // this.currentFileCompanyLogo = undefined;
          });
    }
  }


  removeSelectedFile(i) {
    this.btnFlag = false;
    this.selectFileUpload = true;
    //this.proProfileImage3 = this.proProfileImage1.concat(this.arr);
    this.arr.splice(i, 1);
    this.filesToUpload.splice(i, 1);
    //this.proProfileImage1.splice(i, 1);
    //this.proProfileImage3.splice(i, 1);

    this.totalLength = this.filesToUpload.length;
    this.chosseTypecount = this.totalLength;
    ////console.log("p1", this.proProfileImage1)
    //console.log("arr", this.arr)
    ////console.log("p3", this.proProfileImage3)
    if (this.totalLength == 0) {
      this.logoFlag1 = false;
    }
  }

  async newPassword1() {
   
  }
}

