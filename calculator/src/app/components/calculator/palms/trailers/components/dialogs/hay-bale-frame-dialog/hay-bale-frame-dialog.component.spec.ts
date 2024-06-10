import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HayBaleFrameDialogComponent } from './hay-bale-frame-dialog.component';

describe('HayBaleFrameDialogComponent', () => {
  let component: HayBaleFrameDialogComponent;
  let fixture: ComponentFixture<HayBaleFrameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HayBaleFrameDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HayBaleFrameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
