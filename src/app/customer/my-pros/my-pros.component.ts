import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-my-pros',
  templateUrl: './my-pros.component.html',
  styleUrls: ['./my-pros.component.scss']
})
export class MyProsComponent implements OnInit {
  googleRating: any =4;
  constructor() { }

  ngOnInit(): void {
  }
  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }
}
