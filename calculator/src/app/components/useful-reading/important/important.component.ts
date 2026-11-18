import { Component } from '@angular/core';
import { FooterComponent } from '../../footer/footer.component';
import { NavigationComponent } from '../../navigation/navigation.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-important',
    standalone: true,
    templateUrl: './important.component.html',
    styleUrl: './important.component.css',
    imports: [FooterComponent, NavigationComponent]
})
export class ImportantComponent {
    constructor(private readonly router: Router) {}

    navigateToCalculation() {
        this.router.navigate(['configurator/palms']);
    }
}
