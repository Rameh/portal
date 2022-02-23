import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProComponent } from './report-pro.component';

describe('ReportProComponent', () => {
  let component: ReportProComponent;
  let fixture: ComponentFixture<ReportProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
