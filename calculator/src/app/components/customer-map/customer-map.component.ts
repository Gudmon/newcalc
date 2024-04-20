import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { GoogleMap, MapAdvancedMarker, MapInfoWindow, MapMarker } from '@angular/google-maps'
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
    selector: 'app-customer-map',
    standalone: true,
    templateUrl: './customer-map.component.html',
    styleUrl: './customer-map.component.css',
    imports: [GoogleMap, MapInfoWindow, MapMarker, NavigationComponent, MapAdvancedMarker]
})
export class CustomerMapComponent implements OnInit {
  zoom = 8;
  center!: google.maps.LatLngLiteral | google.maps.LatLng;
  height: number = 0;
  markerPositions: { position: google.maps.LatLngLiteral, title: string }[] = [];
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 17,
    minZoom: 7,
  };
  @ViewChildren(MapInfoWindow) infoWindowsViews!: QueryList<MapInfoWindow>;
  
  openInfoWindow(marker: MapMarker, windowIndex: number) {
    let curIdx = 0;
    this.infoWindowsViews.forEach((window: MapInfoWindow) => {
      if (windowIndex === curIdx) {
        window.open(marker);
        curIdx++;
      } else {
        curIdx++;
      }
    });
  }

  ngOnInit() {
    this.height = window.innerHeight - (window.innerHeight * 0.11)
    
    this.center = {
      lat: 47.1801191,
      lng: 19.5014212
    }
    
    this.markerPositions.push({ position: { lat: 46.6292108, lng: 19.2892695 }, title: 'Palms 6S' });
    this.markerPositions.push({ position: { lat: 46.6981933, lng: 19.0208102 }, title: 'Palms 10D + Palms 5.85' });
  }
 
  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++;
  }
 
  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--;
  }
}
