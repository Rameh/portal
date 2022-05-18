import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetQuotesEmailCheckComponent } from './get-quotes-email-check.component';

describe('GetQuotesEmailCheckComponent', () => {
  let component: GetQuotesEmailCheckComponent;
  let fixture: ComponentFixture<GetQuotesEmailCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetQuotesEmailCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetQuotesEmailCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
