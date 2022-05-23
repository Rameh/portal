import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailCheckComponent } from './customer/email-check/email-check.component';
import { GetQuotesEmailCheckComponent } from './customer/get-quotes-email-check/get-quotes-email-check.component';
import { NewCustomerBookAproComponent } from './customer/new-customer-book-apro/new-customer-book-apro.component';
import { NewCustomerGetQuotesComponent } from './customer/new-customer-get-quotes/new-customer-get-quotes.component';
import { PasswordCheckComponent } from './customer/password-check/password-check.component';
import { ProPublicProfileComponent } from './pro-public-profile/pro-public-profile.component';

const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule),
  },
  { path: 'biz/pro-public-profile/:id', component: ProPublicProfileComponent },
  { path: 'biz/email-check/:id', component: EmailCheckComponent },
  { path: 'biz/get-quotes-email-check/:id', component: GetQuotesEmailCheckComponent },
  { path: 'biz/new-customer-book-apro/:id', component: NewCustomerBookAproComponent },
  { path: 'biz/new-customer-get-a-quotes/:id', component: NewCustomerGetQuotesComponent },
  { path: 'biz/password-check/:id', component: PasswordCheckComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
