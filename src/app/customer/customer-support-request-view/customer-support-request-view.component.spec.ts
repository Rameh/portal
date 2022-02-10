import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupportRequestViewComponent } from './customer-support-request-view.component';

describe('CustomerSupportRequestViewComponent', () => {
  let component: CustomerSupportRequestViewComponent;
  let fixture: ComponentFixture<CustomerSupportRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSupportRequestViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSupportRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
