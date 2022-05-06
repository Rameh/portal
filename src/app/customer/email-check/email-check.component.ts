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
  
  constructor(private route: ActivatedRoute,  public formBuilder: FormBuilder,public authService: AuthService,public router: Router) { 
    this.signInForm = this.buildFormGroup({})
  }

  ngOnInit(): void {
    this.proId=this.route.snapshot.params.id
    this.signInForm = this.formBuilder.group(
      {
        emailId: ["", Validators.required],
        //password: ["", Validators.required],
        //role: ["", Validators.required]
      })
  }

  private buildFormGroup(formData): any {
    const signInForm = {
      emailId: ['h1@sunkpo.com'],
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
                console.log("🚀 ~ file: email-check.component.ts ~ line 36 ~ EmailCheckComponent ~  this.roles",  this.roles)
                for (var i = 0; i < data.data?.length; i++) {
                  this.roleCode = data.data[i].rbac[0].roleCode
                }
                if (data.data.length > 1) {
                  this.roleOptions = true;
                  this.roles = data.data
                } else if (data.data.length == 1) {
                  this.roleOptions = false;
                  this.router.navigate(['customer/book-pro',this.proId])
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
    console.log("submit")
  }

}
