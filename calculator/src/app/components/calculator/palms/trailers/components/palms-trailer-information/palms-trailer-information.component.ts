import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PalmsTrailer } from '../../models/palms-trailer';
import { TrailerDataItemComponent } from '../../../shared/components/machine-data-item/machine-data-item.component';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-palms-trailer-information',
  standalone: true,
  imports: [TrailerDataItemComponent, GalleriaModule, ImageModule],
  templateUrl: './palms-trailer-information.component.html',
  styleUrl: './palms-trailer-information.component.css'
})
export class PalmsTrailerInformationComponent implements OnInit {
  displayBasic: boolean = false;
  images: any[] | undefined = []
  responsiveOptions: any[] = []
  @Input({required: true}) trailer!: PalmsTrailer
  @Output() craneSelected = new EventEmitter<number>();

  constructor(){}

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
