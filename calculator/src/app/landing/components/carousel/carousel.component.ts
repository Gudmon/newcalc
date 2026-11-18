import { Component } from '@angular/core';
import { CalculatorComponent } from '../calculator/calculator.component';

@Component({
    selector: 'app-carousel',
    standalone: true,
    imports: [CalculatorComponent],
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.css'
})
export class CarouselComponent {
    readonly backgroundImages = [
        '/assets/palms_default3.png',
        '/assets/palms_default6.png',
        '/assets/palms_default12.png'
    ];
}
