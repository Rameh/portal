import { Component, OnInit } from '@angular/core';
import { LeadService } from '../../services/lead.service';
import {
  DEFAULT_PERSON_IMAGE,
  SUCCESS_CODE,
  UNAUTHORIZED_CODE,
  INTERNAL_SERVER_ERROR_MSG,
  ALREADY_EXIST_CODE
} from '../../helpers/constants';
import { first } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-lead-list',
  templateUrl: './customer-lead-list.component.html',
  styleUrls: ['./customer-lead-list.component.scss']
})
export class CustomerLeadListComponent implements OnInit {

  public leadsList:any;
  public loginId:any;
  constructor(
    public leadService: LeadService, 
    public route: ActivatedRoute,  
    public router: Router,
    private toastr: ToastrManager
    ) { }

  ngOnInit(): void {
    this.loginId=this.route.snapshot.params.loginId
    //localStorage.setItem()
    //localStorage.setItem("proId", JSON.stringify(this.proId));
    localStorage.setItem("loginId",this.loginId);
    this.getLeadListPro()
  }

  // getProDetails() {
  //   //console.log("prodetails")
  //   console.log('this.headerInformation.id',this.loginId.id)
  //   this.leadService.getProProfile(this.headerInformation.id).subscribe((data) => {
  //     if (data.status == SUCCESS_CODE) {
  //       this.proProfile = { ...data['data'] }
       
  //     }
  //   }, (error) => {
  //   })
  // }

  getLeadListPro() {
    this.leadService.getProjectList('CU202112306028')
      .subscribe((data) => {
        if (data.status == SUCCESS_CODE) {
          this.leadsList = data.data
          console.log("this.leadsList", this.leadsList)
        } else if (data.status == UNAUTHORIZED_CODE) {
        }
      }, (error) => {
        this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
      })
  }

  viewLead(data) {
    this.router.navigate(['/customer/project-view'], { queryParams: { customerId: data.customerId } })
  }

}
