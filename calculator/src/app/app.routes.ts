import { Routes } from '@angular/router';
import { OverviewComponent } from './components/calculator/overview/overview.component';
import { ProductComponent } from './components/product/product.component';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PalmsOverviewComponent } from './components/calculator/palms/palms-overview/palms-overview.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'calculator/krpan', component: OverviewComponent},
    {path: 'calculator/palms', component: PalmsOverviewComponent},
    {path: 'krpan/:id', component: ProductComponent},
    // {path: 'not-found', component: NotFoundComponent },
    // {path: '**', redirectTo: '/not-found' } 
];
