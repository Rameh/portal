import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  serviceArea: any;
  dateTimeData: any;
  imgPath: any;
  proId: any;
  constructor(private route: ActivatedRoute,public leadService: LeadService,    public router: Router,) { }

  ngOnInit(): void {
    //this.route.snapshot.params.id
    this.proId=this.route.snapshot.params.id
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
        this.leadService.proData=this.proProfile
        this.serviceArea=this.proProfile.serviceArea
        this.dateTimeData=this.proProfile.businessHours
        this.imgPath = this.proProfile.attachments
        console.log("🚀 ~ file: mypro-view.component.ts ~ line 39 ~ MyproViewComponent ~ this.serviceArea", this.serviceArea)
      }
    })
  }

  bookNow() {
    // this.displayFileModal = 'block'
    this.router.navigate(['customer/book-pro',this.proId])
    //alert('This function redirect to website')
  }
  reportPro(){
    this.router.navigate(['/customer/report-pro',this.proId])
  }
  getAQuote() {
    alert('This function redirect to website')
  }
  onCloseHandled() {
    //this.displayFileModal = 'none';
  }

}
