import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PalmsTrailer } from '../../models/palms-trailer';
import { TrailerDataItemComponent } from '../../../shared/components/machine-data-item/machine-data-item.component';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-palms-trailer-information',
  standalone: true,
  imports: [TrailerDataItemComponent, GalleriaModule, ImageModule, YouTubePlayerModule],
  templateUrl: './palms-trailer-information.component.html',
  styleUrl: './palms-trailer-information.component.css'
})
export class PalmsTrailerInformationComponent implements OnInit, AfterViewInit {
  displayBasic: boolean = false;
  images: any[] | undefined = []
  responsiveOptions: any[] = []
  videoHeight: number | undefined;
  videoWidth: number | undefined;
  @Input({required: true}) trailer!: PalmsTrailer
  @Output() craneSelected = new EventEmitter<number>();
  @ViewChild("youTubePlayer") youTubePlayer!: ElementRef<HTMLDivElement>;

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  @HostListener('document:keyup.escape', ['$event'])
  onKeyup() {
    this.displayBasic = false;
  }

  ngAfterViewInit(): void {
    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  onResize(): void {
    // you can remove this line if you want to have wider video player than 1200px
    this.videoWidth = Math.min(
      this.youTubePlayer.nativeElement.clientWidth + 75,
      1200
    );
    // so you keep the ratio
    this.videoHeight = this.videoWidth * 0.6;
    this.changeDetectorRef.detectChanges();
  }


  ngOnInit(): void {
    this.setResponsiveOptions();
    this.setImages();  
  }

  getCranes(){
    return this.trailer.crane.map(crane => ({ id: crane.id, name: crane.name }));
  }

  craneSelectedEmit(craneId: number){
    this.craneSelected.emit(craneId)
  }

  private setImages(){
    this.images = [
      {
        itemImageSrc: `../../../../../../../assets/${this.trailer?.name}-1.svg`,
        thumbnailImageSrc:  `../../../../../../../assets/${this.trailer?.name}-1.svg`,
        alt: 'Description for trailer image 1',
        title: 'Trailer image 1'
      },
      {
        itemImageSrc: `../../../../../../../assets/${this.trailer?.name}-2.jpg`,
        thumbnailImageSrc:  `../../../../../../../assets/${this.trailer?.name}-2.jpg`,
        alt: 'Description for trailer image 2',
        title: 'Trailer image 2'
      },
    ]  
  }

  private setResponsiveOptions(){
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
