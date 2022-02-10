import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { ModalComponent } from './modal.component';

@NgModule({
  declarations: [
    ModalComponent
  ],
  exports: [ModalComponent],
  imports: [
    CommonModule,
    LeafletModule
  ]
})
export class ModalModule { }
