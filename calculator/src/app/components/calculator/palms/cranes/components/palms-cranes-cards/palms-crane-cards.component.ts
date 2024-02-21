import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PalmsCraneOverview } from '../../models/palms-crane-overview';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-palms-cranes-cards',
  standalone: true,
  imports: [CardModule],
  templateUrl: './palms-crane-cards.component.html',
  styleUrl: './palms-crane-cards.component.css'
})
export class PalmsCranesCardsComponent {
  @Input({required: true}) cranes!: PalmsCraneOverview[];
  @Output() buttonClickEmitter = new EventEmitter<number>();

  buttonClickEmit(craneId: number) {
    this.buttonClickEmitter.emit(craneId);
  }
}
