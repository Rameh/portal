import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProsComponent } from './my-pros.component';

describe('MyProsComponent', () => {
  let component: MyProsComponent;
  let fixture: ComponentFixture<MyProsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
