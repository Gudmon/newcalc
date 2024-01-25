import { Component } from '@angular/core';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavigationComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
