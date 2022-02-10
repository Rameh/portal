import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyproViewComponent } from './mypro-view.component';

describe('MyproViewComponent', () => {
  let component: MyproViewComponent;
  let fixture: ComponentFixture<MyproViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyproViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyproViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
