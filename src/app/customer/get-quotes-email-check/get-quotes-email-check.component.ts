import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { SUCCESS_CODE,INTERNAL_SERVER_ERROR_MSG, NOT_FOUND_CODE, } from '../../helpers/constants'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-quotes-email-check',
  templateUrl: './get-quotes-email-check.component.html',
  styleUrls: ['./get-quotes-email-check.component.scss']
})
export class GetQuotesEmailCheckComponent implements OnInit {

  public signInForm : FormGroup;
  roles: any;
  roleCode: any;
  roleOptions: boolean | undefined;
  proId: any;
  isUserExist: boolean = false;
  noUserExist: boolean = false;
  tempPass: any;
  ShowPassword:boolean=false;
  incorrectPasswordErrorMessage: boolean=false;
  EmailIdErrorMessage: boolean=false;
  ShowVerificationScreen: boolean=false;
  ShowEmail:boolean=true;
  userData: any;
  mailId: any;
  mailId1: any;
  maskedEmailID: any;
  forgotPasswordPageModes:  boolean=false;
  forgotPasswordNewPasswordMode:  boolean=false;
  verificationCodeMode: any;
  verificationCode: any;
  verificationCodeSecretKey: any;
  dataChecking1: any;


  constructor(private route: ActivatedRoute,  public formBuilder: FormBuilder,public authService: AuthService,public router: Router) { 
    this.signInForm = this.buildFormGroup({})
  }

  ngOnInit(): void {
    this.proId=this.route.snapshot.params.id
    this.signInForm = this.formBuilder.group(
      {
        emailId: ["", Validators.required],
        password: ["", Validators.required],
        //role: ["", Validators.required]
      })
  }

  private buildFormGroup(formData): any {
    const signInForm = {
      emailId: ['',Validators.required],
      password:['']
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
                  this.router.navigate(['biz/new-customer-get-a-quotes',this.proId])
                }
              }
            }
          )
      }
  }

  onSubmit() {
    if(!this.signInForm.value.emailId){
      this.EmailIdErrorMessage=true;
    }else{
      this.ShowPassword=true
      this.EmailIdErrorMessage=false;
    }
    this.authService.verifyEmailId(this.signInForm.value.emailId.toLowerCase()).subscribe(data => {
      for (var i = 0; i < data.data?.length; i++) {
        this.roles = data.data[i].rbac[0].roleCode
        this.tempPass = data.data[i].tempPassword
      }
    })
    
    //this.router.navigate(['biz/password-check',this.proId])
    
  }

  Login(){
    if(this.signInForm.value.password == this.tempPass){
      this.router.navigate(['customer/get-quotes',this.proId])
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
}
