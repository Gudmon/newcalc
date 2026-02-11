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
import { PalmsTrailer } from '../../models/palms-trailer';
import { TrailerDataItemComponent } from '../../../shared/components/machine-data-item/machine-data-item.component';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CloudinaryModule } from '@cloudinary/ng';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';

@Component({
    selector: 'app-palms-trailer-information',
    standalone: true,
    imports: [TrailerDataItemComponent, GalleriaModule, ImageModule, YouTubePlayerModule, CloudinaryModule],
    templateUrl: './palms-trailer-information.component.html',
    styleUrl: './palms-trailer-information.component.css'
})
export class PalmsTrailerInformationComponent implements OnInit, AfterViewInit {
    thumbnails: CloudinaryImage[] = [];

    imageSelected(image: CloudinaryImage, idx: number) {
        console.log('selected', image);
        this.activeIndex = idx;
        this.displayBasic = true;
    }
    activeIndex: number = 0;
    displayBasic: boolean = false;
    images: any[] | undefined = [];
    responsiveOptions: any[] = [];
    videoHeight: number | undefined;
    videoWidth: number | undefined;
    galleryContainerStyle: any = {};
    @Input({ required: true }) trailer!: PalmsTrailer;
    @Output() craneSelected = new EventEmitter<number>();
    @ViewChild('youTubePlayer') youTubePlayer!: ElementRef<HTMLDivElement>;

    cld = new Cloudinary({
        cloud: {
            cloudName: 'dhidgc7eu'
        }
    });

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    @HostListener('document:keyup.escape', ['$event'])
    onKeyup() {
        this.displayBasic = false;
    }

    ngOnInit(): void {
        this.thumbnails = (this.trailer.imageUrls ?? []).map((imgUrl) => this.cld.image(imgUrl).resize(fill().width(400).height(200)));
        this.setResponsiveOptions();
        this.setImages();
        this.resize();
    }

    ngAfterViewInit(): void {
        this.resize();
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

    getCranes() {
        return this.trailer.cranes.map((crane) => ({ id: crane.id, name: crane.name }));
    }

    craneSelectedEmit(craneId: number) {
        this.craneSelected.emit(craneId);
    }

    private setImages() {
        this.images = this.trailer.images.map((img) => ({
            itemImageSrc: img.toURL(),
            thumbnailImageSrc: img.toURL(),
            alt: 'Trailer image',
            title: 'Trailer image'
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
