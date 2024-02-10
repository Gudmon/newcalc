import { Component, OnInit } from '@angular/core';
import { PalmsService } from '../../services/palms.service';
import { ActivatedRoute } from '@angular/router';
import { PalmsTrailer } from '../../models/palms-trailer';
import { NavigationComponent } from "../../../../navigation/navigation.component";
import { FooterComponent } from "../../../../footer/footer.component";
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-palms-trailer',
    standalone: true,
    providers: [PalmsService],
    templateUrl: './palms-trailer.component.html',
    styleUrl: './palms-trailer.component.css',
    imports: [NavigationComponent, FooterComponent, DividerModule, GalleriaModule, FormsModule, ButtonModule, ImageModule]
})
export class PalmsTrailerComponent implements OnInit{
  trailer!: PalmsTrailer
  private id = this.activatedRoute.snapshot.paramMap.get('id')!;
  equipmentSelected: boolean = false;
  displayBasic: boolean = false;
  images: any[] | undefined = []
  responsiveOptions: any[] = [
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

  constructor(
    private palmsService: PalmsService,
    private activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.palmsService.getTrailer(this.id).pipe().subscribe((response) => {
      console.log(response);
      this.trailer = response as PalmsTrailer;

      this.images = [
        {
          itemImageSrc: `../../../../../../assets/${response.name}-2.svg`,
          thumbnailImageSrc:  `../../../../../../assets/${response.name}-2.svg`,
          alt: 'Description for Image 1',
          title: 'Title 1'
        },
        {
          itemImageSrc: `../../../../../../assets/${response.name}-3.jpg`,
          thumbnailImageSrc:  `../../../../../../assets/${response.name}-3.jpg`,
          alt: 'Description for Image 1',
          title: 'Title 1'
        },
      ]
    })
  }

  getCranes(){
    const craneNames = this.trailer.crane.map((crane) => crane.name);
    console.log(craneNames);
    return craneNames;
  }

  loadConfigurations(){

  }
}
