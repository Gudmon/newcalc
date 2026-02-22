import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-not-found',
    standalone: true,
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.css',
    imports: [NavigationComponent, FooterComponent]
})
export class NotFoundComponent {
    constructor(private readonly router: Router) {}

    navigateToHome(){
        this.router.navigate(['/']);
    }
}
