import { InputSwitchModule } from 'primeng/inputswitch';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { FormsModule } from '@angular/forms';
import { HintItem } from '../../../shared/models/hint-item';

@Component({
    selector: 'app-palms-crane-calculator-hints',
    standalone: true,
    imports: [TimelineModule, CardModule, CommonModule, InputSwitchModule, FormsModule],
    templateUrl: './palms-crane-calculator-hints.component.html',
    styleUrl: './palms-crane-calculator-hints.component.css'
})
export class PalmsCraneCalculatorHintsComponent {
    hints: HintItem[];

    constructor() {
        this.hints = [
            { title: 'Daru konfigurálása', description: 'Válassza ki a kívánt felszereltséget.' },
            {
                title: 'Pótkocsi konfigurálása (opcionális)',
                description: 'A kompatibilis pótkocsi kártyáján válassza a „Kiválaszt” gombot. A pótkocsival is kezdheti.'
            },
            { title: 'Információ az elemekről', description: 'Az „i” ikonra kattintva elolvashatja az adott felszereltség leírását.' },
            { title: 'PDF mentése', description: 'A „Mentés PDF-ben” gomb letölti az összeállítás összefoglalóját.' },
            { title: 'Üzenet küldése', description: 'Töltse ki az űrlapot; a mentett PDF-et csatoljuk az üzenethez.' },
            { title: 'Új összeállítás', description: 'A „Törlés” gombbal eltávolíthatja a darut vagy a pótkocsit.' }
        ];
    }
}
