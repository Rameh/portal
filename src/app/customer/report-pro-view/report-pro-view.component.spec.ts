import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProViewComponent } from './report-pro-view.component';

describe('ReportProViewComponent', () => {
  let component: ReportProViewComponent;
  let fixture: ComponentFixture<ReportProViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportProViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
