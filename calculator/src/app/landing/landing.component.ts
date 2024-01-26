import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { FooterComponent } from '../components/footer/footer.component';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import { TruncatePipe } from "../components/pipes/truncate.pipe";
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-landing',
    standalone: true,
    templateUrl: './landing.component.html',
    styleUrl: './landing.component.css',
    imports: [NavigationComponent, FooterComponent, GalleriaModule, FormsModule, CheckboxModule, TruncatePipe, CardModule]
})
export class LandingComponent implements OnInit {
  responsiveOptions: any[] | undefined;
  images: any[] | undefined;
  position: string = 'bottom';
  showIndicatorsOnItem: boolean = false;

  positionOptions = [
    {
        label: 'Bottom',
        value: 'bottom'
    },
    {
        label: 'Top',
        value: 'top'
    },
    {
        label: 'Left',
        value: 'left'
    },
    {
        label: 'Right',
        value: 'right'
    }
];

  ngOnInit(): void {
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];

    this.images = [ 
      { 
          itemImageSrc:  
          '../../../assets/krpan.png', 
          thumbnailImageSrc:  
          '../../../assets/daru1.png', 
          alt: 'Description for Image 1', 
          title: 'Title 1'
      },
      { 
        itemImageSrc:  
          '../../../assets/palms.png', 
          thumbnailImageSrc:  
          '../../../assets/daru2.png', 
          alt: 'Description for Image 3', 
          title: 'Title 3'
      }, 
      
    ]

    
  }
}
