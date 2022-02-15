import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-mypro-view',
  templateUrl: './mypro-view.component.html',
  styleUrls: ['./mypro-view.component.scss']
})
export class MyproViewComponent implements OnInit {
  googleRating: any =0;
  yelpRating:any=4
  aggregateRating:any=0
  proProfile: any;
  constructor(private route: ActivatedRoute,public leadService: LeadService) { }

  ngOnInit(): void {
    //this.route.snapshot.params.id
    this.getProProfile(this.route.snapshot.params.id)
  }
  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }


  getProProfile(proId){
    //this.customerEmailId=localStorage.getItem('emailId')
    this.leadService.getProProfile(proId)
    .subscribe((data) => {
      if (data.status == 200) {
        this.proProfile = { ...data['data'] }
        console.log("proprofile",  this.proProfile)
      }
    })
  }

  bookNow() {
    // this.displayFileModal = 'block'
    alert('This function redirect to website')
  }
  getAQuote() {
    alert('This function redirect to website')
  }
  onCloseHandled() {
    //this.displayFileModal = 'none';
  }

}
