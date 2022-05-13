import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { SUCCESS_CODE,INTERNAL_SERVER_ERROR_MSG, NOT_FOUND_CODE, } from '../../helpers/constants'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrls: ['./email-check.component.scss']
})
export class EmailCheckComponent implements OnInit {

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
                  this.router.navigate(['biz/new-customer-book-apro',this.proId])
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
    alert("Tim to give Flow")
    this.router.navigate(['biz/password-check',this.proId])
  }
}
