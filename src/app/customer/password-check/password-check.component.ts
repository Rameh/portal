import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-password-check',
  templateUrl: './password-check.component.html',
  styleUrls: ['./password-check.component.scss']
})
export class PasswordCheckComponent implements OnInit {
  proId: any;
  constructor(private route: ActivatedRoute,public router: Router) { }

  ngOnInit(): void {
    this.proId=this.route.snapshot.params.id
  }


  Login(){
    
    this.router.navigate(['customer/book-pro',this.proId])
  }
}
