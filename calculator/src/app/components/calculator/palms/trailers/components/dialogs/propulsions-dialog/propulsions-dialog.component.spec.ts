import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropulsionDialogComponent } from './propulsions-dialog.component';

describe('PropulsionDialogComponent', () => {
  let component: PropulsionDialogComponent;
  let fixture: ComponentFixture<PropulsionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropulsionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropulsionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
