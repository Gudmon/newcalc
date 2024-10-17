import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighPerformanceOilFilterDialogComponent } from './high-performance-oil-filter-dialog.component';

describe('HighPerformanceOilFilterDialogComponent', () => {
  let component: HighPerformanceOilFilterDialogComponent;
  let fixture: ComponentFixture<HighPerformanceOilFilterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighPerformanceOilFilterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighPerformanceOilFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
