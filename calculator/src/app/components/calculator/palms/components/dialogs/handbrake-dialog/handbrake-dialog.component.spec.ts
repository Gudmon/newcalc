import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandbrakeDialogComponent } from './handbrake-dialog.component';

describe('HandbrakeDialogComponent', () => {
  let component: HandbrakeDialogComponent;
  let fixture: ComponentFixture<HandbrakeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandbrakeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandbrakeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
