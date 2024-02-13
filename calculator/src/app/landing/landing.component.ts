import { Component, DestroyRef, OnInit } from '@angular/core';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { FooterComponent } from '../components/footer/footer.component';
import { GalleriaComponent } from "./components/galleria/galleria.component";
import { ActivitiesComponent } from "./components/activities/activities.component";
import { CalculatorsComponent } from "./components/calculators/calculators.component";
import { HighlightsComponent } from "./components/highlights/highlights.component";
import { GoogleMapsModule } from '@angular/google-maps'
import { MapsComponent } from "./components/maps/maps.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-landing',
    standalone: true,
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.css',
    providers: [HttpClient],
    imports: [NavigationComponent, GoogleMapsModule, GalleriaComponent, HttpClientModule, ActivitiesComponent, CalculatorsComponent, HighlightsComponent, FooterComponent, MapsComponent]
})
export class LandingComponent implements OnInit{
    constructor(private readonly httpService: HttpClient){}
    tyreIds: any[] = [];

    ngOnInit(): void {
        
    }

    
}
function takeuntilDestroyed(): import("rxjs").OperatorFunction<Object, unknown> {
    throw new Error('Function not implemented.');
}

