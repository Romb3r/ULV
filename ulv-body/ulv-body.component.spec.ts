import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlvBodyComponent } from './ulv-body.component';

describe('UlvBodyComponent', () => {
  let component: UlvBodyComponent;
  let fixture: ComponentFixture<UlvBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlvBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlvBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
