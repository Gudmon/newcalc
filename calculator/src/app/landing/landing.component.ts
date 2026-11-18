import { Component } from '@angular/core';
import { FooterComponent } from '../components/footer/footer.component';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CustomerMapFeatureComponent } from './components/customer-map-feature/customer-map-feature.component';
import { FeaturesComponent } from './components/features/features.component';
import { GalleriaComponent } from './components/galleria/galleria.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { MapsComponent } from './components/maps/maps.component';

@Component({
    selector: 'app-landing',
    standalone: true,
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.css',
    imports: [
        NavigationComponent,
        CarouselComponent,
        CatalogComponent,
        FeaturesComponent,
        HighlightsComponent,
        CustomerMapFeatureComponent,
        GalleriaComponent,
        MapsComponent,
        FooterComponent
    ]
})
export class LandingComponent {}
