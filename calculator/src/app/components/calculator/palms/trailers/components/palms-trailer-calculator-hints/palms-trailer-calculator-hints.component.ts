import { InputSwitchModule } from 'primeng/inputswitch';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { FormsModule } from '@angular/forms';
import { HintItem } from '../../../shared/models/hint-item';

@Component({
    selector: 'app-palms-trailer-calculator-hints',
    standalone: true,
    imports: [TimelineModule, CardModule, CommonModule, InputSwitchModule, FormsModule],
    templateUrl: './palms-trailer-calculator-hints.component.html',
    styleUrl: './palms-trailer-calculator-hints.component.css'
})
export class PalmsTrailerCalculatorHintsComponent {
    hints: HintItem[] = [];

    constructor() {
        this.setHints();
    }

    private setHints() {
        this.hints = [
            { title: 'Pótkocsi konfigurálása', description: 'Válassza ki a kívánt felszereltséget.' },
            {
                title: 'Daru konfigurálása (opcionális)',
                description: 'A kompatibilis daru kártyáján válassza a „Kiválaszt” gombot. A daruval is kezdheti.'
            },
            {
                title: 'Információ az elemekről',
                description: 'Az „i” ikonra kattintva elolvashatja az adott felszereltség leírását.'
            },
            { title: 'PDF mentése', description: 'A „Mentés PDF-ben” gomb letölti az összeállítás összefoglalóját.' },
            { title: 'Üzenet küldése', description: 'Töltse ki az űrlapot; a mentett PDF-et csatoljuk az üzenethez.' },
            { title: 'Új összeállítás', description: 'A „Törlés” gombbal eltávolíthatja a pótkocsit vagy a darut.' }
        ];
    }
}
