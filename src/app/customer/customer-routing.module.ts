import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookProComponent } from './book-pro/book-pro.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { CustomerLeadListComponent } from './customer-lead-list/customer-lead-list.component';
import { CustomerNotificationsComponent } from './customer-notifications/customer-notifications.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { CustomerSupportRequestFormComponent } from './customer-support-request-form/customer-support-request-form.component';
import { CustomerSupportRequestListComponent } from './customer-support-request-list/customer-support-request-list.component';
import { CustomerSupportRequestViewComponent } from './customer-support-request-view/customer-support-request-view.component';
import { HelpAndFaqsPageComponent } from './help-and-faqs-page/help-and-faqs-page.component';
import { MyProsComponent } from './my-pros/my-pros.component';
import { MyproViewComponent } from './mypro-view/mypro-view.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import {ProjectViewComponent} from './project-view/project-view.component';
import { ReportProComponent } from './report-pro/report-pro.component';
import {TermsAndConditionsPageComponent} from './terms-and-conditions-page/terms-and-conditions-page.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '', component: CustomerLayoutComponent,
    children: [
      { path: 'lead-list/:emailId/:id', component: CustomerLeadListComponent },
      { path: 'project-view/:id', component: ProjectViewComponent },
      { path: 'customer-profile', component: CustomerProfileComponent },
      { path: 'my-pros', component: MyProsComponent },
      { path: 'my-pros-view/:id', component: MyproViewComponent },
      { path: 'notifications', component: CustomerNotificationsComponent },
      {path:'customer-support',component:CustomerSupportRequestFormComponent},
      {path:'support-list',component:CustomerSupportRequestListComponent},
      {path:'support-request-view/:id',component:CustomerSupportRequestViewComponent},
      {path:'privacy-page',component:PrivacyPageComponent},
      {path:'terms-and-conditions-page',component:TermsAndConditionsPageComponent},
      {path:'help-and-faqs-page',component:HelpAndFaqsPageComponent},
      {path:'report-pro/:id',component:ReportProComponent},
      {path:'book-pro/:id',component:BookProComponent}
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
