import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeadService } from 'src/app/services/lead.service';
import {
  SUCCESS_CODE,
  UNAUTHORIZED_CODE,
  INTERNAL_SERVER_ERROR_MSG,
} from '../../helpers/constants';
import { ToastrManager } from 'ng6-toastr-notifications';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/modals/project';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  leadDetails: any;
  projectHistory:any
  authInfo: any;
  roleCode: any;
  imgPath: any;
  category: any;
  SubCategoriesData = [];
  totalCount: any;
  CategoriesData: any;
  projectForm: FormGroup;
  pagination: number = 1;
  proDetails: any;
  proName: any;
  constructor(private route: ActivatedRoute,
    public leadService: LeadService,
    private toastr: ToastrManager,
    private fb: FormBuilder,
  ) { this.projectForm = this.buildFormGroup({}) }

  get f(): { [key: string]: AbstractControl } {
    return this.projectForm.controls;
  }
  ngOnInit(): void {
    //this.getProjectHistory();
    this.getleadDetails(this.route.snapshot.params.id)
  }
  private submitBuildForm(formData): any {
    this.projectForm = this.buildFormGroup(formData);
    this.projectForm.valueChanges.subscribe(data => { })
  }

  private buildFormGroup(formData): any {
    const projectform = {
      projectId: [formData.workOrderNumber, Validators.required],
      createdOn:[formData.createdOn],
      projectName: [formData.WorkDescription?.jobTitle],
      projectDescrption: [formData.WorkDescription?.workDescription],
      firstName: [formData.ServiceAddress?.firstName],
      lastName: [formData.ServiceAddress?.lastName],
      mobileNumber: [formData.ServiceAddress?.phoneNumber],
      emailId: [formData.ServiceAddress?.emailId],
      streetAddress: [formData.ServiceAddress?.streetAddress],
      city: [formData.ServiceAddress?.city],
      state: [formData.ServiceAddress?.state],
      zipcode: [formData.ServiceAddress?.zipcode],
      proName:[],
      proMobileNumber:[]
    };
    return this.fb.group(projectform)
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

  getleadDetails(customerId: string): any {
    if (!customerId) return;
    this.leadService.getLeadDetails(customerId).subscribe(res => {
      if (res.status == SUCCESS_CODE) {
        this.leadDetails = res.data;
        console.log("🚀 ~ file: project-view.component.ts ~ line 82 ~ ProjectViewComponent ~ this.leadDetails", this.leadDetails)
        const formData = this.buildForm<Project>(res.data);
        this.projectForm = this.buildFormGroup(formData);
        this.getProjectHistory(this.leadDetails.workOrderNumber)
        this.getProDetails(this.leadDetails.proId)
        this.submitBuildForm(formData)
      }
      else if (res.status == UNAUTHORIZED_CODE) {
        //this.spinner.hide()
        //this.authService.logout()
      }
    }, (error) => {
      this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
    });
  }

  getProjectHistory(workOrderNumber) {
    //console.log('>>>',this.leadDetails.workOrderNumber)
    this.leadService.getProjectHistory(workOrderNumber)
      .subscribe((data) => {
        if (data.status == SUCCESS_CODE) {
          this.projectHistory = data.data
          console.log("projectHistory>>>>>", this.projectHistory)
        } else if (data.status == UNAUTHORIZED_CODE) {
        }
      }, (error) => {
        this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
      })
  }
  getProDetails(proId) {
    //console.log('>>>',this.leadDetails.workOrderNumber)
    this.leadService.getProProfile(proId)
      .subscribe((data) => {
        if (data.status == SUCCESS_CODE) {
          this.proDetails = data.data
          this.proName=this.proDetails.businessName
          this.projectForm.patchValue({
            proName: this.proName,
            proMobileNumber:this.proDetails.mobileNumber
          });
          console.log("proName>>>>>", this.proName)
        } else if (data.status == UNAUTHORIZED_CODE) {
        }
      }, (error) => {
        this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
      })
  }
  //http://54.82.168.211:8000/pro/getproprofile/618ae544538367663cc10fcc
  onSubmit(): void {
    const request = this.formGroupToForm<Project>(this.projectForm)
    console.log("this form", request)
  }
}
