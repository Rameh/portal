import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerProjectListComponent } from './customer-project-list/customer-project-list.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { MyProsComponent } from './my-pros/my-pros.component';
import { RatingModule } from 'ng-starrating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyproViewComponent } from './mypro-view/mypro-view.component';
import { CustomerNotificationsComponent } from './customer-notifications/customer-notifications.component';
import { CustomerSupportRequestFormComponent } from './customer-support-request-form/customer-support-request-form.component';
import { CustomerSupportRequestListComponent } from './customer-support-request-list/customer-support-request-list.component';
import { CustomerSupportRequestViewComponent } from './customer-support-request-view/customer-support-request-view.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { TermsAndConditionsPageComponent } from './terms-and-conditions-page/terms-and-conditions-page.component';
import { HelpAndFaqsPageComponent } from './help-and-faqs-page/help-and-faqs-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReportProComponent } from './report-pro/report-pro.component';
import { BookProComponent } from './book-pro/book-pro.component';
import { TextMaskModule } from 'angular2-text-mask';
import { CustomerLeadListComponent } from './customer-lead-list/customer-lead-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMatTimepickerModule } from "ngx-mat-timepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTimepickerModule } from 'mat-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomerEstimateListComponent } from './customer-estimate-list/customer-estimate-list.component';
import { EstimateViewComponent } from './estimate-view/estimate-view.component';
const lang = "en-US";
@NgModule({
  declarations: [CustomerProjectListComponent, ProjectViewComponent, CustomerProfileComponent, MyProsComponent, MyproViewComponent, CustomerNotificationsComponent, CustomerSupportRequestFormComponent, CustomerSupportRequestListComponent, CustomerSupportRequestViewComponent, PrivacyPageComponent, TermsAndConditionsPageComponent, HelpAndFaqsPageComponent, ReportProComponent, BookProComponent, CustomerLeadListComponent, CustomerEstimateListComponent, EstimateViewComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    RatingModule,
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTimepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    //BrowserAnimationsModule,
    MatTimepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatTimepickerModule.setLocale(lang)
  ]
})
export class CustomerModule { }
