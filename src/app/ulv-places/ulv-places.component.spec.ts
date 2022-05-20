import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlvPlacesComponent } from './ulv-places.component';

describe('UlvPlacesComponent', () => {
  let component: UlvPlacesComponent;
  let fixture: ComponentFixture<UlvPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlvPlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlvPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
