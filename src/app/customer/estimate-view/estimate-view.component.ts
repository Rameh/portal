import { Component, OnInit } from '@angular/core';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-estimate-view',
  templateUrl: './estimate-view.component.html',
  styleUrls: ['./estimate-view.component.scss']
})
export class EstimateViewComponent implements OnInit {
  estimateDetails: any;
  constructor(public leadService: LeadService) { }

  ngOnInit(): void {
    this.getProProfile()
  }


  getProProfile(){
    this.leadService.getEstimateDetails('ES2022454482')
    .subscribe((data) => {
      if (data.status == 200) {
        this.estimateDetails = { ...data['data'] }
        console.log("estimateDetails",  this.estimateDetails)
      }
    })
  }

}
