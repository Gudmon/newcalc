import { InputSwitchModule } from 'primeng/inputswitch';
import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
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
  hints: HintItem[];

    constructor() {
        this.hints = [
            { title: 'Pótkocsi konfigurálása', description: 'Kérem válassza ki a pótkocsi feltétlenül szükséges elemeit (piros csillaggal jelölt mezők)' },
            { title: 'Opcionális elemek konfigurálása', description: 'Ezután kérem válassza ki a pótkocsi opcionális elemeit' },
            { title: 'Daru konfigurálása (opcionális)', description: 'Amennyiben szeretné, a pótkocsihoz illeszthető daru konfigurálását is elvégezheti a pótkocsi konfigurálásához hasonlóan (kötelező és opcionális mezők)' },
            { title: 'Információ az elemekről', description: 'Az adott elem(ek)ről további infomációt találhat, amennyiben rákattint az információ gombra' },
            { title: 'Összegzés / Kapcsolat', description: 'Végezetül üzenhet nekünk a konfigurálásával kapcsolatban' },
            { title: 'Új konfiguráció kezdése', description: 'Alul a törlés gombra kattintva új kalkulálást tud indítani, enélkül a "Kalkulál" gomb inaktív' },
        ];
    }
}


