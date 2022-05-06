import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomerBookAproComponent } from './new-customer-book-apro.component';

describe('NewCustomerBookAproComponent', () => {
  let component: NewCustomerBookAproComponent;
  let fixture: ComponentFixture<NewCustomerBookAproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCustomerBookAproComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomerBookAproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
