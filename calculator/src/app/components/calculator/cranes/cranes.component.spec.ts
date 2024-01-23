import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CranesComponent } from './cranes.component';

describe('CranesComponent', () => {
  let component: CranesComponent;
  let fixture: ComponentFixture<CranesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CranesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CranesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
