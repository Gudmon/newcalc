import { Routes } from '@angular/router';
import { OverviewComponent } from './components/calculator/overview/overview.component';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
    {path: 'krpan', component: OverviewComponent},
    {path: 'krpan/:id', component: ProductComponent},
];
