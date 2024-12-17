import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonAccordionComponent } from './comparison-accordion.component';

describe('ComparisonAccordionComponent', () => {
  let component: ComparisonAccordionComponent;
  let fixture: ComponentFixture<ComparisonAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonAccordionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComparisonAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
