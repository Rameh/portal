import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { LeadService } from '../../services/lead.service'
import { AuthService } from '../../services/auth.service';
import {
  DEFAULT_PERSON_IMAGE,
  SUCCESS_CODE,
  UNAUTHORIZED_CODE,
  INTERNAL_SERVER_ERROR_MSG,
} from '../../helpers/constants';
import { VerificationCodeService } from 'src/app/services/verification.code.service';

@Component({
  selector: 'app-report-pro-view',
  templateUrl: './report-pro-view.component.html',
  styleUrls: ['./report-pro-view.component.scss']
})
export class ReportProViewComponent implements OnInit {

  reportaproDetails: any;
  authInfo: any;
  roleCode: any;
  imgPath: any;
  category: any;
  SubCategoriesData = [];
  totalCount: any;
  CategoriesData: any;
  reportNumber:any
  proReviewComments:any

  constructor(
    private toastr: ToastrManager,
    public router: Router,
    public route: ActivatedRoute,
    public authService: AuthService,
    public location: Location,
    public leadService: LeadService, 
    private verificationCodeService: VerificationCodeService,
  ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((data) => {
      console.log("🚀 ~ file: report-a-pro-view.component.ts ~ line 50 ~ ReportAProViewComponent ~ data", data)
      this.getReportAProDetails(data.reportNumber)
    })
  }
  getReportAProDetails(reportNumber) {
    this.leadService.getReportAProDetails('RAP202241915')
      .pipe(first())
      .subscribe((data) => {
        if (data.status == SUCCESS_CODE) {
          this.reportaproDetails = data.data[0]
          this.imgPath = this.reportaproDetails.attachments
          console.log("reportaproDetails" + JSON.stringify(this.reportaproDetails))
          this.reportNumber=this.reportaproDetails._id;
          this.proReviewComments=this.reportaproDetails.proReviewComments
          //console.log("this.leadDetails.service.category" + JSON.stringify(this.leadDetails.service.category))
        } else if (data.status == UNAUTHORIZED_CODE) {
          this.authService.logout()
        }
      }, (error) => {
        this.toastr.errorToastr(error, INTERNAL_SERVER_ERROR_MSG)
      })
  }
}


