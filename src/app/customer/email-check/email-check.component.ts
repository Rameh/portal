import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { SUCCESS_CODE,INTERNAL_SERVER_ERROR_MSG, NOT_FOUND_CODE, UNAUTHORIZED_CODE} from '../../helpers/constants'
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from "../../shared/index";
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrls: ['./email-check.component.scss']
})
export class EmailCheckComponent implements OnInit {

  public signInForm : FormGroup;
  public forgotPasswordModeOfSelection: FormGroup;
  public forgotPasswordEmail: FormGroup;
  public forgotPasswordSendVerification: FormGroup;
  public forgotPasswordNewPassword: FormGroup;
  roles: any;
  roleCode: any;
  userData: any;
  roleOptions: boolean | undefined;
  proId: any;
  isUserExist: boolean = false;
  noUserExist: boolean = false;
  tempPass: any;
  ShowEmail:boolean=true;
  ShowPassword:boolean=false;
  incorrectPasswordErrorMessage: boolean=false;
  EmailIdErrorMessage: boolean=false;
  ShowVerificationScreen: boolean=false;
  mailId: any;
  mailId1: any;
  maskedEmailID: any;
  forgotPasswordPageModes:  boolean=false;
  forgotPasswordNewPasswordMode:  boolean=false;
  verificationCodeMode: any;
  verificationCode: any;
  verificationCodeSecretKey: any;
  dataChecking1: any;
  
  constructor(private route: ActivatedRoute,  
    public formBuilder: FormBuilder,public authService: AuthService,public router: Router,
    private toastr: ToastrManager) { 
    this.signInForm = this.buildFormGroup({})
    this.forgotPasswordModeOfSelection=this.buildFormGroup({})
    this.forgotPasswordSendVerification=this.buildFormGroup({})
    this.forgotPasswordNewPassword=this.buildFormGroup({})
    this.forgotPasswordEmail=this.buildFormGroup([])

  }

  ngOnInit(): void {
    this.proId=this.route.snapshot.params.id
    this.forgotPasswordEmail = this.formBuilder.group({
      emailId: ["", Validators.required],
    })
    this.forgotPasswordModeOfSelection = this.formBuilder.group({
      mode: ["", Validators.required]
    })
      //form builder for verification code in form
      this.forgotPasswordSendVerification = this.formBuilder.group({
        code: ["", Validators.required],
      })
          //form builder for creating new password in form
    this.forgotPasswordNewPassword = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required]
    }, {
      validator: MustMatch("password", "confirmPassword")
    })
    this.signInForm = this.formBuilder.group(
      {
        emailId: ["", Validators.required],
        password: ["", Validators.required],
        verification:[""]
        //role: ["", Validators.required]
      })
  }

  private buildFormGroup(formData): any {
    const signInForm = {
      emailId: ['',Validators.required],
      password:[''],
      verification:['']
    };
    return this.formBuilder.group(signInForm)
  }
  roleCheckingMail() {
    
      if (this.signInForm.value.emailId == "") {
        //return false;
      } else {
        this.authService.getUserRolesFromLogin(this.signInForm.value.emailId)
          .pipe(first())
          .subscribe(
            data => {
              if (data.status == SUCCESS_CODE) {
                this.roles = data.data
                // for (var i = 0; i < data.data?.length; i++) {
                //   this.roleCode = data.data[i].rbac[0].roleCode
                //   this.tempPass = data.data[i].tempPassword
                // }
                this.isUserExist = true
                if (data.data.length > 1) {
                  this.roleOptions = true;
                  this.roles = data.data
                  console.log("🚀 ~ file: email-check.component.ts ~ line 77 ~ EmailCheckComponent ~ this.roles", this.roles)
                } else if (data.data.length == 1) {
                  this.roleOptions = false;
                  this.isUserExist = true
                  console.log('data.data.length?????',this.isUserExist)
                  this.EmailIdErrorMessage=false;
                  this.noUserExist = false
                 
                  //this.router.navigate(['customer/book-pro',this.proId])
                  //this.signInForm.get('role').setValue(this.roleCode)
                }
                if(!data.data.length){
                  this.router.navigate(['biz/new-customer-book-apro',this.proId])
                }
              }
            }
          )
      }
  }


 //on form value changes this function will get triggered
 onEmailValueChanges(): void {
  this.isUserExist = false
  //this.forgotPasswordEmail.get('emailId').valueChanges.subscribe(val => {
    //if (val == "") { this.isUserExist = false; this.noUserExist = false; return }
      this.authService.verifyEmailId(this.signInForm.value.emailId)
        .pipe(first())
        .subscribe(
          data => {
            if (data.status == SUCCESS_CODE) {
              this.isUserExist = true
              this.noUserExist = false
              this.maskEmailID()
              this.userData = data.data
              console.log("🚀 ~ file: email-check.component.ts ~ line 121 ~ EmailCheckComponent ~  this.userData",  this.userData)
              this.userData.maskedMobileNumber = this.userData[0].mobileNumber.replace(/.(?=.{4})/g, 'x');
              this.userData.maskedMobileNumber = this.userData[0].maskedMobileNumber.substr(0, 3) + '-' + this.userData[0].maskedMobileNumber.substr(3, 3) + '-' + this.userData[0].maskedMobileNumber.substr(6, 9)

            } else {
              this.isUserExist = false
              this.noUserExist = true
            }
          }, error => {
            //this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
          })
      //return false;
  //})
}


maskEmailID() {
  var mail = this.signInForm.value.emailId
  var len = mail.length
  var index = mail.indexOf("@")
  var res = mail.slice(0, index);
  var res1 = mail.slice(index, len);
  this.mailId = res.replace(/.(?=.{2})/g, '*');
  this.mailId1 = res.replace(/.(?=.{0})/g, '*');
  if (res.length >= 5) {
    this.maskedEmailID = mail.substr(0, 2) + '' + (this.mailId).substr(2, index) + '' + res1
    console.log("🚀 ~ file: email-check.component.ts ~ line 147 ~ EmailCheckComponent ~ this.maskedEmailID", this.maskedEmailID)
  }
  if (res.length < 5) {
    this.maskedEmailID = mail.substr(0, 1) + '' + (this.mailId1).substr(1, index) + '' + res1
    console.log("🚀 ~ file: email-check.component.ts ~ line 151 ~ EmailCheckComponent ~ this.maskedEmailID", this.maskedEmailID)
  }

}

modeOfVerificationCode(type) {
  this.verificationCodeMode = type
}


  // send verification code. eg:- mobileNumber or Email Id for verification code
  async sendVerificationCode() {
    //this.getLeadEmailData()
    if (this.forgotPasswordModeOfSelection.invalid) {
      return;
    }
    let verificationResponse: any = await this.sendVerificationCodeService()
    if (verificationResponse.status == SUCCESS_CODE) {
      this.verificationCode = verificationResponse.data.token
      this.forgotPasswordPageModes=true;
      this.ShowVerificationScreen=false;
      //this.router.navigate(['/auth/forgotpassword'], { queryParams: { mode: FORGOT_PASSWORD_VERIFICATION_CODE_MODE } });
    }
  }


    //send verification code service
    async sendVerificationCodeService() {

      let secretKey: any = await this.verificationCodeSecret()
      this.verificationCodeSecretKey = secretKey.data.secret
  
      let verificationCodeObj = {}
      verificationCodeObj['communicationType'] = this.verificationCodeMode
      //  verificationCodeObj['to'] = this.forgotPasswordModeOfSelection.get('mode').value
      // console.log("verificationCodeObj", this.userData[0].mobileNumber)
      verificationCodeObj['to'] = this.userData[0].emailId
      verificationCodeObj['secret'] = secretKey.data.secret
  
      return new Promise((resolve, reject) => {
        this.authService.sendVerificationCodeForPassword(verificationCodeObj)
          .subscribe((res) => {
            resolve(res)
          }, (error) => {
            reject(error)
          })
      })
    }


      // verification code secret
  verificationCodeSecret() {
    return new Promise((resolve, reject) => {
      this.authService.getVerificationCodeSecret()
        .subscribe((res) => {
          resolve(res)
        }, (error) => {
          reject(error)
          //this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
        })
    })
  }

  onSubmit() {
    if(!this.signInForm.value.emailId){
      this.EmailIdErrorMessage=true;
    }else{
      this.ShowPassword=true
      this.ShowEmail=false
      this.EmailIdErrorMessage=false;
    }
    this.authService.verifyEmailId(this.signInForm.value.emailId.toLowerCase()).subscribe(data => {
      for (var i = 0; i < data.data?.length; i++) {
        this.roles = data.data[i].rbac[0].roleCode
        this.tempPass = data.data[i].tempPassword
        console.log("🚀 ~ file: email-check.component.ts ~ line 90 ~ EmailCheckComponent ~ this.tempPass", this.tempPass)
      }
    })
    
    //this.router.navigate(['biz/password-check',this.proId])
    
  }

  Login(){
    //this.signInForm.value.password
    console.log("🚀 ~ file: email-check.component.ts ~ line 101 ~ EmailCheckComponent ~ this.signInForm.value.password", this.signInForm.value.password)
    if(this.signInForm.value.password == this.tempPass){
      this.router.navigate(['customer/book-pro',this.proId])
      this.incorrectPasswordErrorMessage=false;
      localStorage.setItem('LoginUser',"true")
    }else{
      this.incorrectPasswordErrorMessage=true;
    }
  }
  forgotPassword() {
    //alert("Tim to give Flow")
    this.ShowVerificationScreen=true
    this.ShowPassword=false
    this.ShowEmail=false
    this.onEmailValueChanges();
    //this.router.navigate(['biz/password-check',this.proId])
  }


    // new password
    async newPassword() {
      //this.submittedForCode = true
      if (this.forgotPasswordSendVerification.invalid) {
       // this.spinner.hide()
        return;
      }
  
      let verifyingVerificationCode: any = await this.verifyVerificationCode()
      console.log("🚀 ~ file: email-check.component.ts ~ line 277 ~ EmailCheckComponent ~ verifyingVerificationCode", verifyingVerificationCode)
      if (verifyingVerificationCode.status == SUCCESS_CODE && verifyingVerificationCode.data.valid) {
        this.forgotPasswordPageModes=false
        this.forgotPasswordNewPasswordMode=true
        //this.spinner.hide()
        //this.router.navigate(['/auth/forgotpassword'], { queryParams: { mode: FORGOT_PASSWORD_PASSWORD_MODE } });
      } else {
        //this.spinner.hide()
        this.toastr.infoToastr('Invalid Verification Code', 'Verification Code')
      }
    }

    
  //verify verification code
  verifyVerificationCode() {
    let verifyCode = {}
    verifyCode['secret'] = this.verificationCodeSecretKey;
    verifyCode['code'] = this.forgotPasswordSendVerification.value.code
    return new Promise((resolve, reject) => {
      this.authService.verifyVerificationCode(verifyCode)
        .pipe(first())
        .subscribe(res => {
          resolve(res)
        }, (error) => {
          reject(error)
          this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
        })
    })
  }




    // confirm entered password
    confirmPassword() {
      // this.spinner.show()
      //this.submittedForPassword = true
      if (this.forgotPasswordNewPassword.invalid) {
        //this.spinner.hide()
        return;
      }
      let changePasswordData = {}
      changePasswordData['emailId'] = this.signInForm.value.emailId
      changePasswordData['password'] = this.forgotPasswordNewPassword.value.confirmPassword
      this.authService.changePassword(changePasswordData)
        .pipe(first())
        .subscribe(
          data => {
            if (data.status == SUCCESS_CODE) {
              this.router.navigate(['customer/my-pros'])
              this.dataChecking1 = {
                "emailId": this.signInForm.value.emailId,
                "password": this.forgotPasswordNewPassword.value.confirmPassword,
                "role": this.userData[0].rbac[0].roleCode
              }
              this.authService.login(this.dataChecking1)
                .pipe(first())
                .subscribe(
                  data => {
                    if (data.status == SUCCESS_CODE) {
                      // this.router.navigate(['http://topproz2.s3-website-us-east-1.amazonaws.com/auth/signin'])
                      this.router.navigate(['customer/my-pros'])
                      ////console.log("roleCode"+JSON.stringify(data))
                      if (this.roleCode == "CUST") {
                        //this.login1()
                      }
                    } else if (data.status == UNAUTHORIZED_CODE) {
                      //this.spinner.hide()
                      this.toastr.errorToastr(data.response, 'Incorrect Credentials')
                    }
                  }, (error) => {
                    //this.spinner.hide()
                    this.toastr.errorToastr(error, 'Internal server error')
                  });
            }
          })
  
    }

}
