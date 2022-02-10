import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerLeadListComponent } from './customer-lead-list/customer-lead-list.component';
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



@NgModule({
  declarations: [CustomerLeadListComponent, ProjectViewComponent, CustomerProfileComponent, MyProsComponent, MyproViewComponent, CustomerNotificationsComponent, CustomerSupportRequestFormComponent, CustomerSupportRequestListComponent, CustomerSupportRequestViewComponent, PrivacyPageComponent, TermsAndConditionsPageComponent, HelpAndFaqsPageComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class CustomerModule { }