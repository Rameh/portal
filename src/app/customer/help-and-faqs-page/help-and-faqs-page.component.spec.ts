import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAndFaqsPageComponent } from './help-and-faqs-page.component';

describe('HelpAndFaqsPageComponent', () => {
  let component: HelpAndFaqsPageComponent;
  let fixture: ComponentFixture<HelpAndFaqsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpAndFaqsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpAndFaqsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
