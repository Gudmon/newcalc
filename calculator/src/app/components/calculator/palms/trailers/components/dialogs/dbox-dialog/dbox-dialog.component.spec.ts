import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DboxDialogComponent } from './dbox-dialog.component';

describe('DboxDialogComponent', () => {
  let component: DboxDialogComponent;
  let fixture: ComponentFixture<DboxDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DboxDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DboxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
