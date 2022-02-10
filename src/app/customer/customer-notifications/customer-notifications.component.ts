import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { first } from 'rxjs/operators';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-customer-notifications',
  templateUrl: './customer-notifications.component.html',
  styleUrls: ['./customer-notifications.component.scss']
})
export class CustomerNotificationsComponent implements OnInit {
  notificationList: any;
  constructor( 
    public leadService: LeadService,    
    private toastr: ToastrManager
    ) { }


  ngOnInit(): void {
    this.getCustomerNotifications()
  }

  getCustomerNotifications() {
    const loginId = localStorage.getItem('loginId')
    this.leadService.getNotification()
      .subscribe((data) => {
        if (data.status == 200) {
          this.notificationList = data.data
          console.log("  this.notificationList",   this.notificationList)
        }
      }
      )
  }
  onDelete(notificationId){
    let updatedNotification={}
    updatedNotification['deleteFlag']=true
    this.leadService.updateCustomerNotification(notificationId,updatedNotification)
    .pipe(first())
    .subscribe(
      async data => {
        if (data.status === 200) {
          this.toastr.successToastr(data.response, 'Success')
        }
        if (data.status === 404) {
          this.toastr.errorToastr(data.message, 'Error')
        }
      }, (error) => {
        this.toastr.errorToastr(error, 'Internal server error')
      });
  }
}
