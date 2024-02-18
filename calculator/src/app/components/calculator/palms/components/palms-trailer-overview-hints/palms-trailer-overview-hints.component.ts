import { InputSwitchModule } from 'primeng/inputswitch';
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { FormsModule } from '@angular/forms';
import { HintItem } from '../../models/hint-item';

@Component({
  selector: 'app-palms-trailer-overview-hints',
  standalone: true,
  imports: [TimelineModule, CardModule, CommonModule, InputSwitchModule, FormsModule],
  templateUrl: './palms-trailer-overview-hints.component.html',
  styleUrl: './palms-trailer-overview-hints.component.css'
})
export class PalmsTrailerOverviewHintsComponent {
  hints: HintItem[];

  constructor() {
      this.hints = [
          { title: 'S', description: 'Egyalvázas pótkocsi' },
          { title: 'D', description: 'Dupla alvázas pótkocsi' },
          { title: 'U', description: 'Unibody típusú pótkocsi' },
          { title: 'SX', description: '?' },
          { title: 'SC', description: '?' },
          { title: 'DWD', description: '?' },
          { title: 'MWD', description: 'Mechanikus 4 WD-s pótkocsi' },
          { title: 'HWMD', description: 'Hidromechanikus 4 WD-s pótkocsi' }
      ];
  }
}
