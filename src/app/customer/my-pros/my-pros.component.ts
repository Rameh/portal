import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-my-pros',
  templateUrl: './my-pros.component.html',
  styleUrls: ['./my-pros.component.scss']
})
export class MyProsComponent implements OnInit {
  googleRating: any;
  customerEmailId: any;
  customerProList: any;
  constructor( public leadService: LeadService) { }

  ngOnInit(): void {
    this.getCustomerPros()
  }
  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }
  getCustomerPros(){
    this.customerEmailId=localStorage.getItem('emailId')
    this.leadService.getCustomerPros('kiran96@gmail.com')
    .subscribe((data) => {
      if (data.status == 200) {
        this.customerProList = data.data
        console.log("🚀customerProList", this.customerProList)
      }
    })

  }
}
