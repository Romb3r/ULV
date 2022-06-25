import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlvLoginComponent } from './ulv-login.component';

describe('UlvLoginComponent', () => {
  let component: UlvLoginComponent;
  let fixture: ComponentFixture<UlvLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlvLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlvLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
