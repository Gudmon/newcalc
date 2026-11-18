import { Component } from '@angular/core';

interface Reason {
    title: string;
    description: string;
    icon: string;
}

@Component({
    selector: 'app-highlights',
    standalone: true,
    imports: [],
    templateUrl: './highlights.component.html',
    styleUrl: './highlights.component.css'
})
export class HighlightsComponent {
    readonly reasons: Reason[] = [
        {
            title: 'Ügyfélgondozás',
            description: 'Segítünk a megfelelő gép kiválasztásában, és megkereséseire rövid időn belül válaszolunk.',
            icon: 'pi-users'
        },
        {
            title: 'Katalógusok',
            description: 'Részletes termékleírások és műszaki információk a döntéshez.',
            icon: 'pi-book'
        },
        {
            title: 'Alkatrésztámogatás',
            description: 'Gyors és megbízható alkatrészellátás a gépekhez.',
            icon: 'pi-box'
        },
        {
            title: 'Raktáron lévő gépek',
            description: 'Előzetes egyeztetés után személyesen is megtekinthetők.',
            icon: 'pi-home'
        },
        {
            title: 'Konzultáció',
            description: 'Személyre szabott tanácsadással segítjük a választást.',
            icon: 'pi-comments'
        },
        {
            title: 'Rendezvények',
            description: 'Találkozzon velünk szakmai kiállításokon és eseményeken.',
            icon: 'pi-calendar'
        }
    ];
}
