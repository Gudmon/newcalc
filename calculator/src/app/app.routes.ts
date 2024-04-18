import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PalmsOverviewComponent } from './components/calculator/palms/shared/components/palms-overview/palms-overview.component';
import { PalmsCranePageComponent } from './components/calculator/palms/cranes/components/palms-crane-page/palms-crane-page.component';
import { PalmsTrailerPageComponent } from './components/calculator/palms/trailers/components/palms-trailer-page/palms-trailer-page.component';
import { CustomerMapComponent } from './components/customer-map/customer-map.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'calculator/palms', component: PalmsOverviewComponent},
    {path: 'calculator/palms/trailers/:id', component: PalmsTrailerPageComponent},
    {path: 'calculator/palms/cranes/:id', component: PalmsCranePageComponent},
    {path: 'customer-map', component: CustomerMapComponent},
    {path: 'not-found', component: NotFoundComponent },
    {path: '**', redirectTo: '/not-found' } 
];
