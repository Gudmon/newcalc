import { Routes } from '@angular/router';
import { OverviewComponent } from './components/calculator/overview/overview.component';
import { ProductComponent } from './components/product/product.component';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'calculator/krpan', component: OverviewComponent},
    {path: 'krpan/:id', component: ProductComponent},
    {path: 'not-found', component: NotFoundComponent }, // Add this line for the not found route
    {path: '**', redirectTo: '/not-found' } 
];
