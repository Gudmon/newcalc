import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HydropackDialogComponent } from './hydropack-dialog.component';

describe('HydropackDialogComponent', () => {
  let component: HydropackDialogComponent;
  let fixture: ComponentFixture<HydropackDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HydropackDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HydropackDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
