import { Component, OnInit } from '@angular/core';
import { CraneDetail } from '../../models/crane-detail';
import { GalleriaModule } from 'primeng/galleria';
import { ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [GalleriaModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  craneDetail: CraneDetail | undefined;
  responsiveOptions: any[] | undefined;
  images: any[] | undefined;

  constructor(private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.setCraneDetail();
    this.setResponsiveOptions();
    this.images =  [ 
      { 
          previewImageSrc:  
          '../../../assets/daru1.png', 
          thumbnailImageSrc:  
          '../../../assets/daru1.png', 
          alt: 'Description for Image 1', 
          title: 'Title 1'
      }, 
      { 
          previewImageSrc:  
          '../../../assets/daru1.1.jpg', 
          thumbnailImageSrc:  
          '../../../assets/daru1.1.jpg', 
          alt: 'Description for Image 2', 
          title: 'Title 2'
      }, 
      { 
          previewImageSrc:  
          '../../../assets/daru1.2.png', 
          thumbnailImageSrc:  
          '../../../assets/daru1.2.png', 
          alt: 'Description for Image 3', 
          title: 'Title 3'
      }, 
      { 
          previewImageSrc:  
          '../../../assets/daru1.3.png', 
          thumbnailImageSrc:  
          '../../../assets/daru1.3.png', 
          alt: 'Description for Image 4', 
          title: 'Title 4'
      }
  ]; 
  }
 
  
  setCraneDetail(){
    this.craneDetail = {
      id: this.route.snapshot.paramMap.get('id')!,
      name: 'KRPAN GD 6,6 K',
      reachMax: '6,6',
      reachWithGrabOpen: '7,2',
      liftingTorqueNet: '40',
      liftingCapacity: '1020',
      weight: '900',
      price: 17955,
      imgUrls: ['https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg']
    }
  }

  setResponsiveOptions(){
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
  }
}



