import { InputSwitchModule } from 'primeng/inputswitch';
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { FormsModule } from '@angular/forms';
import { HintItem } from '../../../shared/models/hint-item';

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
          { title: 'DWD', description: 'Dupla alvázas pótkocsi 2 kerék hajtással' },
          { title: 'U', description: 'Unibody típusú pótkocsi' },
          { title: 'UWD', description: 'Unibody alvázas pótkocsi 2 kerék hajtással' },
          { title: 'UAWD', description: 'Unibody alvázas pótkocsi 4 kerék hajtással' },
          { title: 'SX', description: '?' },
          { title: 'SC', description: '?' },
          { title: 'MWD', description: 'Mechanikus pótkocsi 4 kerék hajtással' },
          { title: 'HWMD', description: 'Hidromechanikus pótkocsi 4 kerék hajtással' }
      ];
  }
}
