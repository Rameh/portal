import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProListViewComponent } from './report-pro-list-view.component';

describe('ReportProListViewComponent', () => {
  let component: ReportProListViewComponent;
  let fixture: ComponentFixture<ReportProListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportProListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
