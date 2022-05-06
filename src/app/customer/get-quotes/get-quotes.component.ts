import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
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
  selector: 'app-get-quotes',
  templateUrl: './get-quotes.component.html',
  styleUrls: ['./get-quotes.component.scss']
})
export class GetQuotesComponent implements OnInit {
  @ViewChild("timepicker") timepicker: any;
  control = new FormControl(new Date());
  model;
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
  categoryName: any;
  categoryNameArray: any;
  formControlItem: FormControl = new FormControl("");
  required: boolean = !1;
  subCategoriePrice: any;

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
  /**
   * Lets the user click on the icon in the input.
   */
   openFromIcon(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }
  /**
   * Function to clear FormControl's value, called from the HTML template using the clear button
   *
   * @param $event - The Event's data object
   */
  onClear($event: Event) {
    this.formControlItem.setValue(null);
  }

  ngOnInit(): void {
    this.createBookProForm();
    this.getProProfile(this.route.snapshot.params.id)
    this.currentDate = moment(new Date()).format("YYYY-MM-DD");
    this.emailId=localStorage.getItem('emailId')
    this.leadService.getUserProfile('pavan.s@sunkpo.com').subscribe((data) => {
      if (data.status == 200) {
        let userProfileData = { ...data['data'][0] }
        this.customerId=userProfileData.customerId
        this.getWorkOrderListBasedOnCustomer(this.customerId)
        this.getWOServiceAddress(this.customerId)
      }
    })
    
  }

  pickDate() {
    $('#date-picker').datepicker('show');
  }
  createBookProForm() {
    this.serviceAddressForm = this.fb.group({
      servicecustomerName: ['', Validators.required],
      serviceemailId: ['', Validators.required],
      emailId:[''],
      firstName:[''],
      lastName:[''],
      password:['123456'],
      mobileNumber:[],
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
      selectCategory:[''],
      selectSubCategory:[''],
      projectName:[''],
      projectDescription: [''],
      bookingDate:[''],
      bookingTime:['']
    })
  }
  get s() { return this.serviceAddressForm.controls; }

  getProProfile(proId){
    this.leadService.getProProfile(proId)
    .subscribe((data) => {
      if (data.status == 200) {
        this.proProfile = { ...data['data'] }
        console.log("this.proProfile", this.proProfile)
        this.leadService.proData=this.proProfile
        this.serviceArea=this.proProfile.serviceArea
        this.dateTimeData=this.proProfile.businessHours
        this.businessName=this.proProfile.businessName
        this.categories = this.proProfile.serviceArea[0].category
      }
    })
  }

    /* get stateName */
    getSubCategoriesData(code) {
      this.categoryNameArray=this.categories.filter(o=>o.categoryCode === code)
      this.leadService.getSubCategoriesData(code)
        .subscribe((data) => {
          if (data.status == SUCCESS_CODE) {
            this.subCategories = data['data']
          }
        })
    }

    getSubCategoriesBapPrice(code) {
      this.subCategoriePrice=this.subCategories.filter(o=>o.subcategoryName === code)
    }

  getWOServiceAddress(customerId) {
    this.leadService.workorderServiceAddressData(customerId)
      .pipe(first())
      .subscribe((data) => {
        if (data.status == SUCCESS_CODE) {
          this.woServiceAddress = data.data;
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

  onEndTime(endTime) {
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
      selectCategory:[''],
      selectSubCategory:['']
    };
    return this.fb.group(bookProform)
  }

  onSubmit() {
    if (!this.bookProform.valid) {
      alert('Please fill all the required fields to create a super hero!')
    } else {
      this.bookProform.patchValue({
        customerId: this.customerId
      })
      const DirectBookingleadDetailsObj = {}
      DirectBookingleadDetailsObj['projectName'] = this.serviceAddressForm.value.projectName
      DirectBookingleadDetailsObj['projectDescription'] = this.serviceAddressForm.value.projectDescription
      DirectBookingleadDetailsObj['firstName'] = this.serviceAddressForm.value.firstName
      DirectBookingleadDetailsObj['lastName'] = this.serviceAddressForm.value.lastName
      DirectBookingleadDetailsObj['mobileNumber'] = this.serviceAddressForm.value.mobileNumber
      DirectBookingleadDetailsObj['DBLeadEmailId'] = 'hatim.naim@gmail.com'
      DirectBookingleadDetailsObj['loginId']='618b2590538367663cc11007',
      DirectBookingleadDetailsObj['proLoginId']=this.route.snapshot.params.id
      DirectBookingleadDetailsObj['proEmailId']=this.proProfile.emailId
      DirectBookingleadDetailsObj['proMobileNumber']=this.proProfile.mobileNumber
      DirectBookingleadDetailsObj['proName']=this.proProfile.businessName
      DirectBookingleadDetailsObj['isGetquotes'] = true
      DirectBookingleadDetailsObj['DBLPrice']=  this.subCategoriePrice[0].bapPrice
      DirectBookingleadDetailsObj['serviceAddress'] = {}
      DirectBookingleadDetailsObj['serviceAddress']['streetAddress'] = this.serviceAddressForm.value.servicestreetAddress
      DirectBookingleadDetailsObj['serviceAddress']['city'] = this.serviceAddressForm.value.servicecity
      DirectBookingleadDetailsObj['serviceAddress']['state'] = this.serviceAddressForm.value.servicestate
      DirectBookingleadDetailsObj['serviceAddress']['zipcode'] = this.serviceAddressForm.value.servicezipcode
      DirectBookingleadDetailsObj['attachments'] = this.proProfileImage1;
      DirectBookingleadDetailsObj['service'] = {}
      DirectBookingleadDetailsObj['service']['catgoryCode'] = this.serviceAddressForm.value.selectCategory
      DirectBookingleadDetailsObj['service']['category'] =  this.categoryNameArray[0].categoryName
      DirectBookingleadDetailsObj['service']['subCategory'] = this.serviceAddressForm.value.selectSubCategory
      DirectBookingleadDetailsObj['service']['subCategoryCode'] = this.serviceAddressForm.value.subCatCode
     
      this.leadService.bookAPro(DirectBookingleadDetailsObj)
        .pipe(first())
        .subscribe(
          data => {
            if (data.status == 200) {
              this.toastr.successToastr(`Your request is being sent to "${this.businessName}"`, 'Thank You')
              this.router.navigateByUrl('/customer/lead-list')
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
      } else if (data.status == UNAUTHORIZED_CODE) {
      }
    }, (error) => {
      this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
    })
  }

  getWorkOrderData(value) {    
   const gg= this.workOrdeList.filter(o=>o.workOrderNumber === value)
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
    if (this.serviceAddressForm.value.servicezipcode.length === 5 && this.serviceAddressForm.value.servicestreetAddress !== "") {
      var address = this.serviceAddressForm.value.servicestreetAddress + "," + this.serviceAddressForm.value.servicecounty + "," + this.serviceAddressForm.value.servicecity + "," + this.serviceAddressForm.value.servicezipcode + "," + this.serviceAddressForm.value.servicestate
      var add = { address: address }
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
    this.radioSel = this.woServiceAddress[this.radioSelected]
    if (this.radioSel) {
      this.serviceAddressForm.patchValue(
        {
          flagStatus: "NO",
          serviceemailId: this.radioSel._id.emailId,
          emailId:this.radioSel._id.emailId,
          servicecustomerName: this.radioSel._id.customerName,
          servicefirstName: this.radioSel._id.firstName,
          firstName:this.radioSel._id.firstName,
          lastName:this.radioSel._id.lastName,
          servicelastName: this.radioSel._id.lastName,
          servicephoneNumber: this.radioSel._id.phoneNumber,
          mobileNumber: this.radioSel._id.phoneNumber,
          servicestreetAddress: this.radioSel._id.streetAddress,
          
          servicestate: this.radioSel._id.state,
          servicecity: this.radioSel._id.city,
          servicezipcode: this.radioSel._id.zipcode,
          servicecounty: this.radioSel._id.county,
        }
      );
    }
    else {
      this.serviceAddressForm.reset()
    }
  }
  getZipcodeData(zipcode) {
    if (zipcode?.length == 5) {
      this.zipcodelength = false
      this.leadService.getZipcodeData(zipcode).subscribe((data) => {
        if (data.status == 200) {
          this.zipcodeExists = false
          this.zipcodeData1 = data['data']
          this.zipcodeData = data['data'][0]
          this.city = this.zipcodeData?.city
          this.state = this.zipcodeData?.state
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
      })
  }

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
        const fileType= fileInput.target.files[0].type
        var reader = new FileReader();
        reader.onload = (fileInput: any) => {
          this.imgFlag = false;
          this.urls.push(fileInput.target.result);
          this.arr.push({imageBase64:fileInput.target.result,type:fileType});
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
                this.resArr = (resArr1['uploadedImagePath'])
                for (let y = 0; y < this.filesToUpload.length; y++) {
                  const imageType=this.resArr[y].mimetype;
                  this.proProfileImage1.push({Imageurl:this.resArr[y].location,type:imageType});
                  this.serviceAddressForm.value.attachments = this.resArr[y].location;
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

    
}
