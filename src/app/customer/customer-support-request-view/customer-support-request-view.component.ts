import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-customer-support-request-view',
  templateUrl: './customer-support-request-view.component.html',
  styleUrls: ['./customer-support-request-view.component.scss']
})
export class CustomerSupportRequestViewComponent implements OnInit {
  supportRequestDetails: any;
  constructor( 
    private route: ActivatedRoute,
    public leadService: LeadService,    
    ) { }

  ngOnInit(): void {
    this.getCustomerNotifications(this.route.snapshot.params.id)
  }

  getCustomerNotifications(ticketNumber) {
    this.leadService.getSupportRequestDetails(ticketNumber)
      .subscribe((data) => {
        if (data.status == 200) {
          this.supportRequestDetails= data.data
          console.log("request view",   this.supportRequestDetails)
        }
      }
      )
  }

}
