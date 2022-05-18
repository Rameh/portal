import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerGetQuotesComponent } from './new-customer-get-quotes.component';

describe('NewCustomerGetQuotesComponent', () => {
  let component: NewCustomerGetQuotesComponent;
  let fixture: ComponentFixture<NewCustomerGetQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCustomerGetQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerGetQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
