import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProPublicProfileComponent } from './pro-public-profile.component';

describe('ProPublicProfileComponent', () => {
  let component: ProPublicProfileComponent;
  let fixture: ComponentFixture<ProPublicProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProPublicProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProPublicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
