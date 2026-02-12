import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { TrailerDataItemComponent } from '../../../shared/components/machine-data-item/machine-data-item.component';
import { PalmsCrane } from '../../models/palms-crane';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { CloudinaryModule } from '@cloudinary/ng';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { format } from '@cloudinary/url-gen/actions/delivery';

@Component({
    selector: 'app-palms-crane-information',
    standalone: true,
    templateUrl: './palms-crane-information.component.html',
    styleUrl: './palms-crane-information.component.css',
    imports: [TrailerDataItemComponent, ImageModule, GalleriaModule, YouTubePlayerModule, CloudinaryModule]
})
export class PalmsCraneInformationComponent implements OnInit, AfterViewInit {
    displayBasic: boolean = false;
    images: any[] | undefined = [];
    responsiveOptions: any[] = [];
    videoHeight: number | undefined;
    videoWidth: number | undefined;
    galleryContainerStyle: any = {};
    activeIndex: number = 0;
    originalImages: CloudinaryImage[] = [];
    thumbnails: CloudinaryImage[] = [];
    @Input({ required: true }) crane!: PalmsCrane;
    @Output() trailerSelected = new EventEmitter<number>();
    @ViewChild('youTubePlayer') youTubePlayer!: ElementRef<HTMLDivElement>;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    cld = new Cloudinary({
        cloud: {
            cloudName: 'dhidgc7eu'
        }
    });

    @HostListener('document:keyup.escape', ['$event'])
    onKeyup() {
        this.displayBasic = false;
    }

    ngOnInit(): void {
        this.thumbnails = (this.crane.imageUrls ?? []).map((imgUrl) => this.cld.image(imgUrl).resize(fill().width(400).height(200)));

        this.setResponsiveOptions();
        this.setImages();
        this.resize();
    }

    ngAfterViewInit(): void {
        this.resize();
    }

    imageSelected(image: CloudinaryImage, idx: number) {
        this.activeIndex = idx;
        this.displayBasic = true;
    }

    resize(): void {
        if (this.youTubePlayer) {
            this.videoWidth = Math.min(this.youTubePlayer.nativeElement.clientWidth, 1200);
            this.videoHeight = this.videoWidth * 0.6;
            this.changeDetectorRef.detectChanges();
        }
    }

    smallScreen() {
        return window.innerWidth < 900;
    }

    getTrailers(): { id: number; name: string }[] {
        return this.crane.trailers.map((trailer) => ({ id: trailer.id, name: trailer.name }));
    }

    trailerSelectedEmit(trailerId: number) {
        this.trailerSelected.emit(trailerId);
    }

    private setImages() {
        this.images = this.crane.images.map((img) => ({
            itemImageSrc: img.toURL(),
            thumbnailImageSrc: img.toURL(),
            alt: 'Crane image',
            title: 'Crane image'
        }));
    }

    private setResponsiveOptions() {
        this.responsiveOptions = [
            {
                breakpoint: '1500px',
                numVisible: 5
            },
            {
                breakpoint: '1024px',
                numVisible: 3
            },
            {
                breakpoint: '768px',
                numVisible: 2
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
    }
}
