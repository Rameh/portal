import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProPublicProfileComponent } from './pro-public-profile/pro-public-profile.component';

const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer.module').then(module => module.CustomerModule),
  },
  { path: 'biz/pro-public-profile/:id', component: ProPublicProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
