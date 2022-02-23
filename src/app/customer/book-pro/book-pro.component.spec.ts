import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookProComponent } from './book-pro.component';

describe('BookProComponent', () => {
  let component: BookProComponent;
  let fixture: ComponentFixture<BookProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
