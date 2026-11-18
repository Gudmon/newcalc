import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';

interface GalleryImage {
    itemImageSrc: string;
    thumbnailImageSrc: string;
    alt: string;
}

@Component({
    selector: 'app-galleria',
    standalone: true,
    imports: [GalleriaModule, CommonModule],
    templateUrl: './galleria.component.html',
    styleUrl: './galleria.component.css'
})
export class GalleriaComponent {
    displayCustom = false;
    activeIndex = 0;

    readonly images: GalleryImage[] = [
        { itemImageSrc: '../../../../assets/palms_default5.png', thumbnailImageSrc: '../../../../assets/palms_default5_min.png', alt: 'PALMS erdészeti gép munkaterületen' },
        { itemImageSrc: '../../../../assets/palms_default9.png', thumbnailImageSrc: '../../../../assets/palms_default9_min.png', alt: 'PALMS pótkocsi és daru' },
        { itemImageSrc: '../../../../assets/palms_default10.png', thumbnailImageSrc: '../../../../assets/palms_default10_min.png', alt: 'PALMS gép erdei környezetben' },
        { itemImageSrc: '../../../../assets/palms_default8.png', thumbnailImageSrc: '../../../../assets/palms_default8_min.png', alt: 'PALMS gép rakodási munkán' },
        { itemImageSrc: '../../../../assets/palms_default6.png', thumbnailImageSrc: '../../../../assets/palms_default6_min.png', alt: 'PALMS daru munka közben' },
        { itemImageSrc: '../../../../assets/palms_default7.png', thumbnailImageSrc: '../../../../assets/palms_default7_min.png', alt: 'PALMS pótkocsi az erdőben' },
        { itemImageSrc: '../../../../assets/palms_default11.png', thumbnailImageSrc: '../../../../assets/palms_default11_min.png', alt: 'PALMS erdészeti gép közelről' },
        { itemImageSrc: '../../../../assets/palms_default12.png', thumbnailImageSrc: '../../../../assets/palms_default12_min.png', alt: 'PALMS erdészeti pótkocsi rakománnyal' }
    ];

    readonly responsiveOptions = [
        { breakpoint: '1024px', numVisible: 4 },
        { breakpoint: '768px', numVisible: 3 },
        { breakpoint: '560px', numVisible: 2 }
    ];

    imageClick(index: number): void {
        this.activeIndex = index;
        this.displayCustom = true;
    }
}
