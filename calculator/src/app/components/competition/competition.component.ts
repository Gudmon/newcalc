import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-competition',
    standalone: true,
    templateUrl: './competition.component.html',
    styleUrl: './competition.component.css',
    imports: [NavigationComponent, FooterComponent]
})
export class CompetitionComponent {

}
