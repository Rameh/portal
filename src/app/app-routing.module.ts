import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailCheckComponent } from './customer/email-check/email-check.component';
import { NewCustomerBookAproComponent } from './customer/new-customer-book-apro/new-customer-book-apro.component';
import { PasswordCheckComponent } from './customer/password-check/password-check.component';
import { ProPublicProfileComponent } from './pro-public-profile/pro-public-profile.component';

const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule),
  },
  { path: 'biz/pro-public-profile/:id', component: ProPublicProfileComponent },
  { path: 'biz/email-check/:id', component: EmailCheckComponent },
  { path: 'biz/new-customer-book-apro/:id', component: NewCustomerBookAproComponent },
  { path: 'biz/password-check/:id', component: PasswordCheckComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
