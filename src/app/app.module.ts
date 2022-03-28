import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonSideMenuModule } from './common/common-side-menu/common.side-menu.module';
import { CustomerLayoutComponent } from './customer/customer-layout/customer-layout.component';
import { CommonFooterComponent } from './common/common-footer/common-footer.component';
import { CommonHeaderComponent } from './common/common-header/common-header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgxMatTimepickerModule } from "ngx-mat-timepicker";
import { LOCALE_ID } from "@angular/core";
const lang = "en-US";
@NgModule({
  declarations: [
    AppComponent,
    CustomerLayoutComponent,
    CommonFooterComponent,
    CommonHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonSideMenuModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    NgxMatTimepickerModule.setLocale(lang)
  ],
  providers: [{ provide: LOCALE_ID, useValue: lang }],
  bootstrap: [AppComponent]
})
export class AppModule { }
