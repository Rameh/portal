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
  SUCCESS_CODE,
  UNAUTHORIZED_CODE,
  INTERNAL_SERVER_ERROR_MSG,
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
  emailId: any;
  customerId: any;
  proProfile: any;
  businessName: any;
  logoFlag1: boolean = false;
  logoFlag2: boolean = false;
  checkFlag1: boolean = false;
  selectedFilesCompanyLogo1: FileList[] | undefined;
  selectedFiles: FileList | undefined;
  h: any;
  filesToUpload: any = [];
  checkValueFlag: boolean = false;
  progressCompanyLogo2 = 0;
  disableSaveOnFileUpload: boolean = false;
  selectFileUpload: boolean = false;
  btnFlag: boolean = false;
  proProfileImage: any;
  resArr: any;
  uploadMessageCompanyLogo1 = '';
  arr: any = [];
  totalLength: any;
  imageArray: any;
  progressHide1: boolean = false;
  chosseTypecount: any;
  fileName = '';
  imgFlag: boolean = false;
  proProfileImage1: any = [];
  urls: any = [];
  customerName: any;
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
    this.emailId = localStorage.getItem('emailId')
    this.leadService.getUserProfile( this.emailId)
      .subscribe((data) => {
        if (data.status == 200) {
          let userProfileData = { ...data['data'][0] }
          console.log("???? ~ file: report-pro.component.ts ~ line 76 ~ ReportProComponent ~ userProfileData", userProfileData)
          this.customerId = userProfileData.customerId
          this.customerName=userProfileData.customerName
          this.getWorkOrderListBasedOnCustomer(this.customerId)
        }
      })
  }

  getProProfile(proId) {
    this.leadService.getProProfile(proId)
      .subscribe((data) => {
        if (data.status == 200) {
          this.proProfile = { ...data['data'] }
          this.leadService.proData = this.proProfile
          this.businessName = this.proProfile.businessName
        }
      })
  }

  private buildFormGroup(formData): any {
    const customerSupportRequestform = {
      customerId: [this.customerId],
      workOrderNumber: [''],
      emailId: ['hn_pro2@rev2g.com'],
      createdOn: [''],
      projectName: [''],
      projectDescription: [''],
      reviewComments: [''],
      resolution: [''],
      resolutiondate: [''],
      resolutionby: [''],
      isNeverShowedUp: [false],
      isShowedUpTooLate: [false],
      isAbusiveBehavior: [false],
      isDoNotLookProfessional: [false],
      isOtherReason: [false],
      customerName:[''],
      proName: [''],
      proEmailId: [''],
      attachments:[''],
      status: ['Open']
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
        customerName:this.customerName,
        proName: this.businessName,
        proEmailId: this.proProfile.emailId,
        attachments:this.proProfileImage1

      })
      this.leadService.createReportPro(this.reportProform.value)
        .pipe(first())
        .subscribe(
          data => {
            if (data.status == 200) {
              this.toastr.successToastr(data.response, 'Thank you')
              //$("#forgotPassword3").modal("show");
              //$("#forgotPassword3").modal("hide");
              this.router.navigateByUrl('/customer/report-pro-list')
              
            }
          }, error => {
            this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
          });
    }
  }

  getWorkOrderListBasedOnCustomer(customerId) {
    this.leadService.getWorkOrderListByProIdAndCustomerId(this.route.snapshot.params.id, customerId)
      .subscribe((data) => {
        if (data.status == SUCCESS_CODE) {
          this.workOrdeList = data.data
        } else if (data.status == UNAUTHORIZED_CODE) {
        }
      }, (error) => {
        this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
      })
  }

  getWorkOrderData(value) {
    const gg = this.workOrdeList.filter(o => o.workOrderNumber === value)
    this.reportProform.patchValue({
      projectName: gg[0].WorkDescription.jobTitle,
      createdOn: gg[0].WorkDescription.createdOn

    })
  }
  // on file select
  selectFiles(fileInput) {
    this.btnFlag = false;
    this.selectFileUpload = true;
    this.checkFlag1 = true;
    this.logoFlag2 = false;
    this.logoFlag1 = false;
    this.selectedFilesCompanyLogo1 = fileInput.target.files;
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
      const fileType = fileInput.target.files[i].type
      var reader = new FileReader();
      reader.onload = (fileInput: any) => {
        this.imgFlag = false;
        this.urls.push(fileInput.target.result);
        this.arr.push({ imageBase64: fileInput.target.result, type: fileType });
        console.log("arr", this.arr)
      }
      reader.readAsDataURL(fileInput.target.files[i]);
    }
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.h = event.target.files[0].name;
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
      this.uploadService.uploadMultiple(files)
        .subscribe(
          (event: any) => {
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
              this.resArr = (resArr1['uploadedImagePath'])
              for (let y = 0; y < this.filesToUpload.length; y++) {
                const imageType = this.resArr[y].mimetype;
                this.proProfileImage1.push({ Imageurl: this.resArr[y].location, type: imageType });
              }
            }
          },
          err => {
            this.progressCompanyLogo2 = 0;
            this.uploadMessageCompanyLogo1 = 'Could not upload the file!';
          });
    }
  }


  removeSelectedFile(i) {
    this.btnFlag = false;
    this.selectFileUpload = true;
    this.arr.splice(i, 1);
    this.filesToUpload.splice(i, 1);
    this.totalLength = this.filesToUpload.length;
    this.chosseTypecount = this.totalLength;
    if (this.totalLength == 0) {
      this.logoFlag1 = false;
    }
  }
  async newPassword1() {

  }
}

