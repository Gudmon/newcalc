import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-calculator',
    standalone: true,
    imports: [ButtonModule, RouterLink],
    templateUrl: './calculator.component.html',
    styleUrl: './calculator.component.css'
})
export class CalculatorComponent {}
