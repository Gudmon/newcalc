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
  galleryContainerStyle: any = { 'max-width': '50%' };
  @Input({required: true}) trailer!: PalmsTrailer
  @Output() craneSelected = new EventEmitter<number>();
  @ViewChild("youTubePlayer") youTubePlayer!: ElementRef<HTMLDivElement>;

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  @HostListener('document:keyup.escape', ['$event'])
  onKeyup() {
    this.displayBasic = false;
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any): void {
  //   this.updateContainerStyle();
  // }

  ngAfterViewInit(): void {
    //this.resize();
    //this.updateContainerStyle();
    //window.addEventListener("resize", this.resize.bind(this));
  }

  resize(): void {
    this.videoWidth = Math.min(
      this.youTubePlayer.nativeElement.clientWidth,
      1200
    );
    this.videoHeight = this.videoWidth * 0.6;
    //this.changeDetectorRef.detectChanges();
  }

  private updateContainerStyle(): void {
    if (window.innerWidth <= 1100) {
      this.galleryContainerStyle = { 'max-width': '100%' };
      this.videoWidth = Math.min(
        window.innerWidth * 0.6,
        500
      );
      this.videoHeight = this.videoWidth * 0.6
    } else if (640 < window.innerWidth && window.innerWidth <= 1024) {
      this.galleryContainerStyle = { 'max-width': '75%' };
      this.videoWidth = window.innerWidth * 0.2
      this.videoHeight = this.videoWidth * 0.5
    } else {
      this.galleryContainerStyle = { 'max-width': '50%' };
      this.videoWidth = window.innerWidth * 0.2
      this.videoHeight = this.videoWidth * 0.5
    }
  }

  smallScreen(){
    return window.innerWidth < 1100;
  }

  ngOnInit(): void {
    this.setResponsiveOptions();
    this.setImages();  
    this.updateContainerStyle();
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
        itemImageSrc: this.trailer.imgUrls[0],
        thumbnailImageSrc:  this.trailer.imgUrls[0],
        alt: 'Description for trailer image 1',
        title: 'Trailer image 1'
      },
      {
        itemImageSrc: this.trailer.imgUrls[1],
        thumbnailImageSrc:  this.trailer.imgUrls[1],
        alt: 'Description for trailer image 2',
        title: 'Trailer image 2'
      }
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
