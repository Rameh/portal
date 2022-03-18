import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
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

@Component({
  selector: 'app-book-pro',
  templateUrl: './book-pro.component.html',
  styleUrls: ['./book-pro.component.scss']
})
export class BookProComponent implements OnInit {

  public currentDate: any;
  bookProform: FormGroup;
  serviceAddressForm: FormGroup;
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
  radioSelected: any;
  radioSel: any = [];
  zipCode: any;
  county: any;
  categories: any;
  subCategories: any;
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
    private route: ActivatedRoute,
    public leadService: LeadService,
    private toastr: ToastrManager,
    public uploadService: UploadService,
    private router: Router

  ) {
    this.bookProform = this.buildFormGroup({})
    this.serviceAddressForm=this.buildFormGroup1({})
  }

  ngOnInit(): void {
    this.createBookProForm();
    this.getProProfile(this.route.snapshot.params.id)
    this.currentDate = moment(new Date()).format("YYYY-MM-DD");
    this.emailId=localStorage.getItem('emailId')

    this.leadService.getUserProfile('hatim.naim@gmail.com').subscribe((data) => {
      if (data.status == 200) {
        let userProfileData = { ...data['data'][0] }
        this.customerId=userProfileData.customerId
        this.getWorkOrderListBasedOnCustomer(this.customerId)
        this.getWOServiceAddress(this.customerId)
      }
    })
  }

  createBookProForm() {
    this.serviceAddressForm = this.fb.group({
      servicecustomerName: ['', Validators.required],
      serviceemailId: ['', Validators.required],
      servicefirstName: ['', Validators.required],
      servicelastName: ['', Validators.required],
      servicephoneNumber: ['', Validators.required],
      servicephoneType: ['' , Validators.required],
      servicestreetAddress: ['' , Validators.required],
      servicezipcode: ['', Validators.required],
      serviceunit: [''],
      servicecity: ['',Validators.required],
      servicestate: ['',Validators.required],
      servicecounty: ['',Validators.required],
      projectName:[''],
      projectDescription: ['']
    })
    //this.makeRecuring()

  }
  get s() { return this.serviceAddressForm.controls; }

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
        this.categories = this.proProfile.serviceArea[0].category
        console.log("🚀 ~ file: book-pro.component.ts ~ line 112 ~ BookProComponent ~  this.proProfile",  this.proProfile)
        //this.imgPath = this.proProfile.attachments
        console.log("🚀 ~ file: mypro-view.component.ts ~ line 39 ~ MyproViewComponent ~ this.serviceArea", this.serviceArea)
      }
    })
  }

    /* get stateName */
    getSubCategoriesData(code) {
      this.leadService.getSubCategoriesData(code)
        .subscribe((data) => {
          if (data.status == SUCCESS_CODE) {
            this.subCategories = data['data']
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

  private buildFormGroup1(formData): any {
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
      streetAddress: [''],
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
  }

  getatlservice(flagStatus) {
    if (flagStatus == 'all') {
      this.serviceAddressForm.reset();
      this.serviceAddressForm.enable();
    }
  }


  createlatlong() {
    console.log("service addresss=====>",this.serviceAddressForm.value)
    //in create lat long addition service
    if (this.serviceAddressForm.value.servicezipcode.length === 5 && this.serviceAddressForm.value.servicestreetAddress !== "") {
      var address = this.serviceAddressForm.value.servicestreetAddress + "," + this.serviceAddressForm.value.servicecounty + "," + this.serviceAddressForm.value.servicecity + "," + this.serviceAddressForm.value.servicezipcode + "," + this.serviceAddressForm.value.servicestate
      var add = { address: address }
      // this.socialMediaService.getGoogleLatLongFromAddress(add)
      //   .subscribe((data) => {
      //     if (data.status == SUCCESS_CODE) {
      //       this.latitude = data.data.lat;
      //       this.longitude = data.data.lng;
      //     }
      //     else {
      //       this.spinner.hide()
      //     }
      //   })
    }
  }
  getServiceCheck1(flagStatus) {
    if (flagStatus == 'NO') {
      // this.serviceAddressForm.reset()
      this.serviceAddressForm.enable();
    }
    else {
      this.serviceAddressForm.reset()
      this.serviceAddressForm.disable()
    }
  }

  selectServiceAddress(radioSelected) {
    this.getSelecteditem()
  }

  getSelecteditem() {
    // this.radioSel = this.woServiceAddress.find(data => data._id.phoneNumber === this.radioSelected);
    this.radioSel = this.woServiceAddress[this.radioSelected]
    console.log(this.radioSel)
    if (this.radioSel) {
      this.serviceAddressForm.patchValue(
        {
          flagStatus: "NO",
          serviceemailId: this.radioSel._id.emailId,
          servicecustomerName: this.radioSel._id.customerName,
          servicefirstName: this.radioSel._id.firstName,
          servicelastName: this.radioSel._id.lastName,
          servicephoneNumber: this.radioSel._id.phoneNumber,
          servicestreetAddress: this.radioSel._id.streetAddress,
          servicestate: this.radioSel._id.state,
          servicecity: this.radioSel._id.city,
          servicezipcode: this.radioSel._id.zipcode,
          servicecounty: this.radioSel._id.county,
        }
      );
      console.log("adresss=====>",this.serviceAddressForm.value)
      //this.createlatlong();
      console.log("adresss=====>",this.serviceAddressForm.value)
    }
    else {
      this.serviceAddressForm.reset()
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
        const fileType= fileInput.target.files[0].type
        console.log("🚀 ~ file: report-pro.component.ts ~ line 203 ~ ReportProComponent ~ fileType", fileType)
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
                //console.log("res",resArr1)
                this.resArr = (resArr1['uploadedImagePath'])
                for (let y = 0; y < this.filesToUpload.length; y++) {
                  const imageType=this.resArr[y].mimetype;
                  this.proProfileImage1.push({Imageurl:this.resArr[y].location,type:imageType});
                }
                console.log("p1", this.proProfileImage1)
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
}
