import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ImportantComponent } from './important.component';

describe('ImportantComponent', () => {
  let component: ImportantComponent;
  let fixture: ComponentFixture<ImportantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportantComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
