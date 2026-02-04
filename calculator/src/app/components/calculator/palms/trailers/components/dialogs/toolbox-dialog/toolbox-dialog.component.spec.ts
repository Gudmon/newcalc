import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolboxDialogComponent } from './toolbox-dialog.component';

describe('ToolboxDialogComponent', () => {
  let component: ToolboxDialogComponent;
  let fixture: ComponentFixture<ToolboxDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolboxDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolboxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
