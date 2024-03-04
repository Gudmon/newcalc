import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TrailerDataItemComponent } from "../../../shared/components/machine-data-item/machine-data-item.component";
import { PalmsCrane } from '../../models/palms-crane';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';

@Component({
    selector: 'app-palms-crane-information',
    standalone: true,
    templateUrl: './palms-crane-information.component.html',
    styleUrl: './palms-crane-information.component.css',
    imports: [TrailerDataItemComponent, ImageModule, GalleriaModule]
})
export class PalmsCraneInformationComponent {
  displayBasic: boolean = false;
  images: any[] | undefined = []
  responsiveOptions: any[] = []
  @Input({required: true}) crane!: PalmsCrane
  @Output() trailerSelected = new EventEmitter<number>();


  @HostListener('document:keyup.escape', ['$event'])
  onKeyup() {
    this.displayBasic = false;
  }


  constructor(){}

  ngOnInit(): void {
    this.setResponsiveOptions();
    this.setImages();  
  }

  getTrailers(): { id: number, name: string }[] {
    return this.crane.trailer.map(trailer => ({ id: trailer.id, name: trailer.name }));
  }

  trailerSelectedEmit(trailerId: number){
    this.trailerSelected.emit(trailerId)
  }

  private setImages(){
    this.images = [
      {
        itemImageSrc: `../../../../../../../assets/${this.crane?.name}-1.svg`,
        thumbnailImageSrc:  `../../../../../../../assets/${this.crane?.name}-1.svg`,
        alt: 'Description for Crane image 1',
        title: 'Crane image 1'
      },
      {
        itemImageSrc: `../../../../../../../assets/${this.crane?.name}-2.jpg`,
        thumbnailImageSrc:  `../../../../../../../assets/${this.crane?.name}-2.jpg`,
        alt: 'Description for Crane image 2',
        title: 'Crane image 2'
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
