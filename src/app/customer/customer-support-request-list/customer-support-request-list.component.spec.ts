import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupportRequestListComponent } from './customer-support-request-list.component';

describe('CustomerSupportRequestListComponent', () => {
  let component: CustomerSupportRequestListComponent;
  let fixture: ComponentFixture<CustomerSupportRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSupportRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSupportRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
