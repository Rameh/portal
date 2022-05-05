import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeadService } from 'src/app/services/lead.service';

@Component({
  selector: 'app-estimate-view',
  templateUrl: './estimate-view.component.html',
  styleUrls: ['./estimate-view.component.scss']
})
export class EstimateViewComponent implements OnInit {
  estimateDetails: any;
  proDetails: any;
  priceBookDetails: any;
  tableList:any=[]
  pricebookCost: any;
  customMaterialCost: any;
  taxPercentage: any;
  taxPercentageValue: any;
  customLaborCost: any;
  totalEstimatePriceBeforeDiscount: any;
  discountPromoCode: any;
  otherDescription: any;
  discountValue: any;
  otherPromoValue: any;
  totalEstimatedPriceAfterDiscount: any;
  depositRequiredValue: any;
  EstimationName: any;
  priceBookList: any;
  materialList: any;
  laborList: any;
  constructor(public leadService: LeadService,  public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProProfile(this.route.snapshot.params.id)
  }


  getProProfile(estimateId){
    this.leadService.getEstimateDetails(estimateId)
    .subscribe((data) => {
      if (data.status == 200) {
        this.estimateDetails =data['data']
        this.proDetails=this.estimateDetails[0].ProDetails[0]
        this.priceBookDetails=this.estimateDetails[0].pricebook_items


        this.priceBookList=this.estimateDetails[0].pricebook_items
        this.materialList=this.estimateDetails[0].custom_material_items
        this.laborList=this.estimateDetails[0].custom_labor_items
        console.log("🚀 ~ file: estimate-view.component.ts ~ line 52 ~ EstimateViewComponent ~ this.laborList", this.laborList)

        this.pricebookCost=this.estimateDetails[0].pricebook_items.pricebookCost
        this.customMaterialCost=this.estimateDetails[0].custom_material_items.customMaterialCost
        this.taxPercentage=this.estimateDetails[0].custom_material_items.taxPercentage
        this.taxPercentageValue=this.estimateDetails[0].custom_material_items.taxPercentageValue
        this.customLaborCost=this.estimateDetails[0].custom_labor_items.customLaborCost
        this.totalEstimatePriceBeforeDiscount=this.estimateDetails[0].estimate_cost.totalEstimatePriceBeforeDiscount
        this.discountPromoCode=this.estimateDetails[0].estimate_cost.discountPromoCode
        this.discountValue=this.estimateDetails[0].estimate_cost.discountValue
        this.otherDescription=this.estimateDetails[0].estimate_cost.otherDescription
        this.otherPromoValue=this.estimateDetails[0].estimate_cost.otherPromoValue
        this.totalEstimatedPriceAfterDiscount=this.estimateDetails[0].estimate_cost.totalEstimatedPriceAfterDiscount
        this.depositRequiredValue=this.estimateDetails[0].estimate_cost.depositRequiredValue
        this.EstimationName=this.estimateDetails[0].service_location.jobTitle
        console.log("estimateDetails55",  this.estimateDetails)
        console.log("estimateDetails",  this.priceBookDetails)
        console.log("tableList",this.tableList)
      }
    })
  }

}
