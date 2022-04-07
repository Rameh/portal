import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { LeadService } from 'src/app/services/lead.service';
import { numVerifyRequestService } from 'src/app/services/numVerifyRequest.service';
import { VerificationCodeService } from 'src/app/services/verification.code.service';
import { MustMatch } from 'src/app/shared';
import {
  SUCCESS_CODE,
  INTERNAL_SERVER_ERROR_MSG,
  NOT_FOUND_CODE
} from '../../helpers/constants'
declare var $: any;
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {

  customerProfileform: FormGroup;
  VerificationForm: any;
  changePasswordForm: any;
  @ViewChild('fileInput')
  el!: ElementRef;
  imageUrl: any;
  editFile: boolean = true;
  removeUpload: boolean = false;
  profileMenu: boolean = false;
  uploadMenu: boolean = false;
  showEditIcon: boolean = false;
  zipcode: any;
  SelectedCountyCheckFlag: boolean = false;
  zipcodeExists: boolean = false;
  stateName: any;
  state: any;
  zipcodelength: boolean = false;
  zipcodeData1: any;
  city: any;
  zipcodeData: any;
  zipCodeStateData: any;
  phoneNumber: any;
  NewphoneNumber: any;
  mobileNumberValidation1: boolean = false;
  invalidMobileNumber: boolean = false;
  public mobileNumber: any;
  oldPhoneNumber: any;
  verificationCodeSecretKey: any;
  mobileVerificationCode: any;
  invalidMobileLead: boolean = false;
  invalidMobileLead1: boolean = false;
  emailId: any;
  resObj: any;
  phoneNumber1: any;
  constructor(
    public leadService: LeadService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private toastr: ToastrManager,
    public communictionService: VerificationCodeService,
    public NumVerifyRequestService: numVerifyRequestService

  ) {
    this.customerProfileform = this.buildFormGroup({})

    this.imageUrl = "../../../assets/images/account.png";
  }
  hide: boolean = true;
  eyeSlash = false
  public mask = {
    guide: true,
    showMask: true,
    mask:['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/,/\d/]
  };
  myFunction() {
    if (this.eyeSlash === true) {
      this.eyeSlash = false
    } else {
      this.eyeSlash = true
    }
    this.hide = !this.hide;
  }
  ngOnInit(): void {
    this.VerificationForm = this.fb.group(
      {
        VerficationCode: ["", Validators.required]
      })
    this.getCustomerProfile()
    this.customerProfileform.disable()
    this.changePasswordForm = this.fb.group({
      oldPassword: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required],
      mode1: ["", Validators.required]
    }, {
      validator: MustMatch("password", "confirmPassword")
    })
  }

  get k() {
    return this.changePasswordForm.controls;
  }

  getCustomerProfile() {
    this.emailId = localStorage.getItem('emailId')
    this.leadService.getUserProfile(this.emailId)
      .subscribe((data) => {
        if (data.status == 200) {
          let userProfileData = { ...data['data'][0] }
          const formData = this.buildForm<any>(userProfileData);
          this.customerProfileform = this.buildFormGroup(formData);
          this.oldPhoneNumber = userProfileData.CustomerBillingAddress.phoneNumber
        }
      }
      )
  }

  private buildFormGroup(formData): any {
    const customerProfileform = {
      firstName: [formData.CustomerBillingAddress?.firstName],
      lastName: [formData.CustomerBillingAddress?.lastName],
      phoneNumber: [formData.CustomerBillingAddress?.phoneNumber],
      emailId: [formData.CustomerBillingAddress?.emailId],
      address: [formData.CustomerBillingAddress?.address],
      city: [formData.CustomerBillingAddress?.city],
      state: [formData.CustomerBillingAddress?.state],
      zipCode: [formData.CustomerBillingAddress?.zipCode],
      customerImage: [null]
    };
    return this.fb.group(customerProfileform)
  }

  private buildForm = <T>(arg?: T): T => {
    if (!arg) return {} as T;
    return arg;
  }
  private reducer = (arg: FormGroup) => (prev, key) => ({
    ...prev,
    [key]: arg.get(key)?.value
  })
  private formGroupToForm = <T>(arg?: FormGroup): T => {
    if (!arg) return {} as T;
    return Object.keys(arg.controls).reduce(this.reducer(arg), {});
  };

  async newPassword1() {
    $("#forgotPassword3").modal("show");
    if (this.changePasswordForm.value.code == '') {
      return;
    }

    this.changePasswordForm.controls['password'].enable();
    this.changePasswordForm.controls['confirmPassword'].enable();
  }

  async confirmPassword1() {

    let changePasswordData = {}
    changePasswordData['id'] = localStorage.getItem('loginId')
    changePasswordData['oldPassword'] = this.changePasswordForm.value.oldPassword
    changePasswordData['newPassword'] = this.changePasswordForm.value.confirmPassword
    console.log("changePasswordData", changePasswordData)

    this.leadService.changePassword(changePasswordData)
      .pipe(first())
      .subscribe(
        async data => {
          $("#forgotPassword3").modal("hide");
          this.changePasswordForm.reset();
          if (data.status === 200) {
            this.toastr.successToastr(data.response, 'Success')
          }
          if (data.status === 404) {
            this.toastr.errorToastr(data.message, 'Error')
          }
        }, (error) => {
          this.toastr.errorToastr(error, 'Internal server error')
        });
  }

  Cancel() {
    $("#forgotPassword3").modal("hide");
    this.changePasswordForm.reset();
  }




  uploadFile(event) {
    this.uploadMenu = true;
    let reader = new FileReader(); 
    let customerImage = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(customerImage);
      reader.onload = () => {
        this.imageUrl = reader.result;
        localStorage.setItem("profileImage", this.imageUrl)
        this.customerProfileform.patchValue({
          customerImage: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      this.cd.markForCheck();
    }
  }

  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.customerProfileform.patchValue({
      customerImage: [null]
    });
  }
  updateProfile() {
    console.log('dsfsdf')
    this.showEditIcon = true;

    this.customerProfileform.enable();
  }

  openMenu() {
    if (this.profileMenu === false) {
      this.profileMenu = true
    } else {
      this.profileMenu = false
    }

  }
  editProfileMenuCancel() {
    this.profileMenu = false
    this.showEditIcon = false;
    this.customerProfileform.disable()
  }
  uploadMenuCancel() {
    this.uploadMenu = false
    this.removeUploadedFile();
  }
  deleteButton() {
    this.removeUploadedFile();
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
          this.customerProfileform.patchValue({
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

  numberValidation() {
    return new Promise((resolve, reject) => {
      this.leadService.getUsPhoneValidation('+1'+''+this.phoneNumber)
        .pipe(first())
        .subscribe(res => {
          resolve(res)
        }, (error) => {
          reject(error)
          this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
        })
    })
  }

  onSubmit() {
    if (!this.customerProfileform.valid) {
      alert('Please fill all the required fields to create a super hero!')
    } else {
      console.log(this.customerProfileform.value)
      this.leadService.updateCustomerProfile( this.emailId, this.customerProfileform.value)
        .pipe(first())
        .subscribe(
          data => {
            if (data.status == 200) {
              this.toastr.successToastr(data.response, 'Customer Profile')
              this.showEditIcon = false;
              window.location.reload()
              this.customerProfileform.disable()
            }
          }, error => {
            this.toastr.errorToastr(error, 'INTERNAL_SERVER_ERROR_MSG')
          });
    }
  }

  numVerifyRequest(obj) {
    this.NumVerifyRequestService.numberVerifyCreation(obj)
      .pipe(first())
      .subscribe((data) => {
        if (data.status == 200) {
        } else if (data.status == 'UNAUTHORIZED_CODE') {
        }
      }, (error) => {
        this.toastr.errorToastr(error, 'INTERNAL_SERVER_ERROR_MSG')
      })
  }

    onCancel() {
    $("#VerifyNumber").modal("hide");
    this.customerProfileform.patchValue({
      phoneNumber: this.oldPhoneNumber
    })
  }

  async getUSPhoneNumberValidation1(value) {
    if (value == "" || value?.length == 0) {
      this.mobileNumberValidation1 = false
      this.invalidMobileNumber = false
      return
    }
    if (value?.length < 14 && value?.length != 0) {
      this.invalidMobileNumber = true;
      this.mobileNumberValidation1 = false;
      return
    }
    else if (value?.length == 14 && value != "" && value?.length != 0 && value?.length != undefined) {
      console.log('llll',value.split(' '))
      this.phoneNumber = value.split('-')[0]+value.split('-')[1]
      console.log("🚀 ~ file: customer-profile.component.ts ~ line 386 ~ CustomerProfileComponent ~  this.phoneNumber",  this.phoneNumber)
      this.NewphoneNumber = value
      this.phoneNumber = this.phoneNumber
     this.resObj = await this.numberValidation()
      if (this.resObj['status'] == SUCCESS_CODE) {

        var numberVerifyObj = {
          usnumber: this.phoneNumber,
          description: 'Pro My Profile: Business Phone number',
          userId: this.customerProfileform.value.emailId,
        }
        this.numVerifyRequest(numberVerifyObj)
        this.mobileNumberValidation1 = false;
        this.invalidMobileNumber = false
      }
      else if (this.resObj['status'] == NOT_FOUND_CODE) {
        var numberVerifyObj1 = {
          usnumber: this.phoneNumber,
          description: 'Pro My Profile: Business Phone number',
          userId: this.customerProfileform.value.emailId,
        }
        this.numVerifyRequest(numberVerifyObj1)

        this.mobileNumberValidation1 = true;
        this.invalidMobileNumber = false;
      }
      if (this.oldPhoneNumber == this.phoneNumber && value != "") {
        this.toastr.warningToastr('New Business phone number is same as old')
      } else if (this.oldPhoneNumber != this.phoneNumber && value != "" && this.mobileNumberValidation1 == false) {
        this.numberVerify();
      }
    }
  }
  numberVerify() {
    $("#VerifyNumber").modal("show");
    this.mobileVerificationSMS()
  }
  leadnotifynumberVerify() {
    $("#VerifyLeadNumber").modal("show");
    this.mobileVerificationSMS()
  }

  numberVerify1() {
    let verifyCode = {}
    verifyCode['secret'] = this.verificationCodeSecretKey;
    verifyCode['code'] = this.mobileVerificationCode
    return new Promise((resolve, reject) => {
      this.communictionService.verifyVerificationCode(verifyCode)
        .pipe(first())
        .subscribe(res => {
          resolve(res)
        }, (error) => {
          reject(error)
          this.toastr.errorToastr(error, 'INTERNAL_SERVER_ERROR_MSG')
        })
    })
  }
  async mobileVerificationSMS() {
    let secretKey: any = await this.numberVerify1()
    this.verificationCodeSecretKey = secretKey.data.secret
    this.communictionService.sendVerificationCodeForPassword({
      communicationType: 'SMS',
      to: this.customerProfileform.value.mobileNumber,
      secret: secretKey.data.secret
    }).subscribe(data => {
      if (data.status == '200') {
        this.mobileVerificationCode = data.data.token;
      }
    }, (error) => {
      this.toastr.errorToastr(error, 'INTERNAL_SERVER_ERROR_MSG')
    })
    this.verificationCodeSecretKey = secretKey.data.secret
  }

  codeSubmit() {
    $("#VerifyNumber").modal("hide");
    this.toastr.successToastr('Business phone number verified');
  }
  keyPress4(event: any) {
    if (this.VerificationForm.value.VerficationCode == '') {
      this.invalidMobileLead = true;
      this.invalidMobileLead1 = false;
    }
    if (this.VerificationForm.value.VerficationCode == this.mobileVerificationCode) {
      this.invalidMobileLead = false;
      this.invalidMobileLead1 = false;
    }
    if (this.VerificationForm.value.VerficationCode != this.mobileVerificationCode && this.VerificationForm.value.VerficationCode != '') {
      this.invalidMobileLead1 = true;
      this.invalidMobileLead = false;
    }
  }
}

