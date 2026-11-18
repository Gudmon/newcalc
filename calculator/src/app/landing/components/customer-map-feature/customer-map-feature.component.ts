import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-customer-map-feature',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './customer-map-feature.component.html',
  styleUrl: './customer-map-feature.component.css'
})
export class CustomerMapFeatureComponent {}
