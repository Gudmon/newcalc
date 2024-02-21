import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PalmsTrailerOverview } from '../../models/palms-trailer-overview';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-palms-trailer-cards',
  standalone: true,
  imports: [CardModule],
  templateUrl: './palms-trailer-cards.component.html',
  styleUrl: './palms-trailer-cards.component.css'
})
export class PalmsTrailerCardsComponent {
  @Input({required: true}) trailers!: PalmsTrailerOverview[];

  constructor(
    readonly router: Router){}

  navigateToTrailer(trailerId: number) {
    this.router.navigate(['/calculator/palms/trailers', trailerId]);
  }
}
