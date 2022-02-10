import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CommonSideMenuComponent } from './common-side-menu.component';

@NgModule({
  declarations: [
    CommonSideMenuComponent
  ],
  exports:[CommonSideMenuComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CommonSideMenuModule { }
