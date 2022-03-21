import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProjectListComponent } from './customer-project-list.component';

describe('CustomerLeadListComponent', () => {
  let component: CustomerProjectListComponent;
  let fixture: ComponentFixture<CustomerProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProjectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
