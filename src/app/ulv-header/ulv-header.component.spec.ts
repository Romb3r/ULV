import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlvHeaderComponent } from './ulv-header.component';

describe('UlvHeaderComponent', () => {
  let component: UlvHeaderComponent;
  let fixture: ComponentFixture<UlvHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlvHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlvHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
