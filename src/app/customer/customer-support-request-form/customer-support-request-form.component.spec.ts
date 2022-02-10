import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupportRequestFormComponent } from './customer-support-request-form.component';

describe('CustomerSupportRequestFormComponent', () => {
  let component: CustomerSupportRequestFormComponent;
  let fixture: ComponentFixture<CustomerSupportRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSupportRequestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSupportRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
