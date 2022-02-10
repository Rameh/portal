import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-mypro-view',
  templateUrl: './mypro-view.component.html',
  styleUrls: ['./mypro-view.component.scss']
})
export class MyproViewComponent implements OnInit {
  googleRating: any =0;
  yelpRating:any=4
  aggregateRating:any=0
  constructor() { }

  ngOnInit(): void {
  }
  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
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
