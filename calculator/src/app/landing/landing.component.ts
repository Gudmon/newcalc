import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { FooterComponent } from '../components/footer/footer.component';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { TruncatePipe } from "../components/pipes/truncate.pipe";
import { CardModule } from 'primeng/card';
import { GalleriaComponent } from "./components/galleria/galleria.component";
import { ActivitiesComponent } from "./components/activities/activities.component";
import { CalculatorsComponent } from "./components/calculators/calculators.component";
import { HighlightsComponent } from "./components/highlights/highlights.component";

@Component({
    selector: 'app-landing',
    standalone: true,
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.css',
    imports: [NavigationComponent, GalleriaComponent, ActivitiesComponent, CalculatorsComponent, HighlightsComponent, FooterComponent]
})
export class LandingComponent implements OnInit {
  ngOnInit(): void {

  }
}
