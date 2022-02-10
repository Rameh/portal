import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLeadListComponent } from './customer-lead-list.component';

describe('CustomerLeadListComponent', () => {
  let component: CustomerLeadListComponent;
  let fixture: ComponentFixture<CustomerLeadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerLeadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
