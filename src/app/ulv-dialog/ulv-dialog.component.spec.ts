import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlvDialogComponent } from './ulv-dialog.component';

describe('UlvDialogComponent', () => {
  let component: UlvDialogComponent;
  let fixture: ComponentFixture<UlvDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlvDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
