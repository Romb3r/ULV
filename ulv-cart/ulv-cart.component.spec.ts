import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlvCartComponent } from './ulv-cart.component';

describe('UlvCartComponent', () => {
  let component: UlvCartComponent;
  let fixture: ComponentFixture<UlvCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlvCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlvCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
