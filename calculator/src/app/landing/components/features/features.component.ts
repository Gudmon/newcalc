import { Component } from '@angular/core';

interface ProductFeature {
    title: string;
    description: string;
    image: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
    readonly features: ProductFeature[] = [
        {
            title: 'Elforduló csatlakozások',
            description: 'A szabadalmaztatott tengelyrendszer csökkenti a karbantartást és növeli a daru tartósságát.*',
            image: '../../assets/feature_slewing.png'
        },
        {
            title: 'Kényelmes munkafelület',
            description: 'Az összecsukható kezelőfelület és a létra használata egyszerű és kényelmes.',
            image: '../../assets/feature_platform.png'
        },
        {
            title: 'Rejtett hidraulikus tömlők',
            description: 'A gém belsejében vezetett tömlők fokozzák a tartósságot és a megbízhatóságot.',
            image: '../../assets/feature_hoses.png'
        },
        {
            title: 'U-alváz kialakítás',
            description: 'A védett vezérlőrendszer és az U-alváz több lehetőséget ad a rakoncák elhelyezésére.',
            image: '../../assets/feature_frame.png'
        },
        {
            title: 'Tesztelt vonórudak',
            description: 'A PALMS vonórudak megfelelnek a legújabb európai szabványoknak.',
            image: '../../assets/feature_drawbar.png'
        },
        {
            title: 'Biztonsági rácsok',
            description: 'Erős, megbízható rácsok, amelyek megfelelnek az európai irányelveknek.',
            image: '../../assets/feature_grills.png'
        },
        {
            title: 'Védett tömlővezetés',
            description: 'A gémtől a rotátorig futó hidraulikatömlők védett kialakítást kapnak.*',
            image: '../../assets/feature_hose_routing.png'
        },
        {
            title: 'Gyors rakoncarögzítés',
            description: 'Szabadalmaztatott rendszer a gyors, egyszerű és biztonságos rögzítéshez.*',
            image: '../../assets/feature_bolsters.png'
        },
        {
            title: 'Tartós fordítóház',
            description: 'A fontos darualkatrészeket szimulációval tervezik és tesztelik.*',
            image: '../../assets/feature_housing_design.png'
        },
        {
            title: 'Tartós festékbevonat',
            description: 'A KTL- és porfestés hosszabb ideig őrzi meg a berendezés minőségét.',
            image: '../../assets/feature_paint_coating.png'
        },
        {
            title: 'Strenx™ acél',
            description: 'A daruk svéd, csúcsminőségű Strenx™ acélból készülnek.',
            image: '../../assets/feature_strenx.png'
        }
    ];
}
