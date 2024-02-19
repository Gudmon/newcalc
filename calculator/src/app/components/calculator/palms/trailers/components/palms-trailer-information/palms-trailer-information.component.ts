import { Component, Input, OnInit } from '@angular/core';
import { PalmsTrailer } from '../../models/palms-trailer';
import { TrailerDataItemComponent } from '../trailer-data-item/trailer-data-item.component';
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

  ngOnInit(): void {
    this.setResponsiveOptions();
    this.setImages();
  }

  getCranes(){
    const craneNames = this.trailer.crane.map((crane) => crane.name);
    return craneNames;
  }

  private setImages(){
    if(this.trailer){
      this.images = [
        {
          itemImageSrc: `../../../../../../assets/${this.trailer.name}-1.svg`,
          thumbnailImageSrc:  `../../../../../../assets/${this.trailer.name}-1.svg`,
          alt: 'Description for Image 1',
          title: 'Title 1'
        },
        {
          itemImageSrc: `../../../../../../assets/${this.trailer.name}-2.jpg`,
          thumbnailImageSrc:  `../../../../../../assets/${this.trailer.name}-2.jpg`,
          alt: 'Description for Image 1',
          title: 'Title 1'
        },
      ]
    }
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
