import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calculators',
  standalone: true,
  imports: [],
  templateUrl: './calculators.component.html',
  styleUrl: './calculators.component.css'
})
export class CalculatorsComponent {
  constructor(readonly router: Router){}

  navigateToPalmsCalculator(){
    this.router.navigate(['calculator/palms']);
  }

  navigateToKrpanCalculator(){
    this.router.navigate(['calculator/krpan']);
  }
}
