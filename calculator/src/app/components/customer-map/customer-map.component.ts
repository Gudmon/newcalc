import { MenuItem } from 'primeng/api/menuitem';
import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
    selector: 'app-customer-map',
    standalone: true,
    templateUrl: './customer-map.component.html',
    styleUrl: './customer-map.component.css',
    imports: [GoogleMapsModule, NavigationComponent]
})
export class CustomerMapComponent implements OnInit {
  zoom = 8;
  center!: google.maps.LatLngLiteral | google.maps.LatLng;
  markerPositions: { position: google.maps.LatLngLiteral, title: string }[] = [];
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 17,
    minZoom: 7,
  };

  height: number = 0;

  ngOnInit() {
    this.height = window.innerHeight - (window.innerHeight * 0.11)
    
    this.center = {
      lat: 47.1801191,
      lng: 19.5014212
    }

    this.markerPositions.push({ position: { lat: 46.6292108, lng: 19.2892695 }, title: 'Palms 6S' });
    this.markerPositions.push({ position: { lat: 46.6981933, lng: 19.0208102 }, title: 'Palms 10D + Palms 5.85' });
    //this.markerPositions.push({ position: { lat: 47.31949245397668, lng: 19.17439739471035 }, title: 'asd' });
  }
 
  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++;
  }
 
  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--;
  }
}
