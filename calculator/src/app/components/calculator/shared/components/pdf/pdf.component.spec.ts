import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfComponent } from './pdf.component';

describe('PdfComponent', () => {
  let component: PdfComponent;
  let fixture: ComponentFixture<PdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validates that the email address has a valid format', () => {
    const email = component.formGroup.get('email');

    email?.setValue('not-an-email');
    expect(email?.hasError('email')).toBeTrue();

    email?.setValue('customer@example.com');
    expect(email?.valid).toBeTrue();
  });
});
