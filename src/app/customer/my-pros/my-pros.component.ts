import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  emailId: any;
  constructor( public leadService: LeadService, public router: Router) { }

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
    this.emailId=localStorage.getItem('emailId')
    this.leadService.getCustomerPros( this.emailId)
    .subscribe((data) => {
      if (data.status == 200) {
        this.customerProList = data.data
        console.log("🚀customerProList", this.customerProList)
      }
    })

  }
  ViewProPublicProfile(proId){
    //const url = this.router.serializeUrl(
      this.router.createUrlTree([`/my-pros-view/${proId}`])
    //);
    //window.open(url, '_blank');
  }
}
