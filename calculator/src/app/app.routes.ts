import { Routes } from '@angular/router';
import { OverviewComponent } from './components/calculator/krpan/components/overview/overview.component';
import { ProductComponent } from './components/product/product.component';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PalmsOverviewComponent } from './components/calculator/palms/shared/components/palms-overview/palms-overview.component';
import { PalmsTrailerComponent } from './components/calculator/palms/trailers/components/palms-trailer/palms-trailer.component';
import { PalmsCraneComponent } from './components/calculator/palms/cranes/components/palms-crane/palms-crane.component';
import { PalmsCranePageComponent } from './components/calculator/palms/cranes/components/palms-crane-page/palms-crane-page.component';
import { PalmsTrailerPageComponent } from './components/calculator/palms/trailers/components/palms-trailer-page/palms-trailer-page.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'calculator/krpan', component: OverviewComponent},
    {path: 'calculator/palms', component: PalmsOverviewComponent},
    // {path: 'calculator/palms/trailers/:id', component: PalmsTrailerComponent},
    {path: 'calculator/palms/trailers/:id', component: PalmsTrailerPageComponent},
    //{path: 'calculator/palms/cranes/:id', component: PalmsCraneComponent},
    {path: 'calculator/palms/cranes/:id', component: PalmsCranePageComponent},
    
    {path: 'krpan/:id', component: ProductComponent},
    // {path: 'not-found', component: NotFoundComponent },
    // {path: '**', redirectTo: '/not-found' } 
];
