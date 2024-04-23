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
  markerPositions: { position: google.maps.LatLngLiteral, title: string, icon: any }[] = [];
  markerPositions2: { position: google.maps.LatLngLiteral, title: string, icon: any }[] = [];
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 17,
    minZoom: 7,
  };
  @ViewChildren(MapInfoWindow) infoWindowsViews!: QueryList<MapInfoWindow>;
  pinColor = "#FFFFFF";
  pinLabel = "A";

    // Pick your pin (hole or no hole)
  pinSVGHole = "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z";
  pinSVGFilled = "M 12,2 C 8.1340068,2 5,5.1340068 5,9 c 0,5.25 7,13 7,13 0,0 7,-7.75 7,-13 0,-3.8659932 -3.134007,-7 -7,-7 z";


  markerOptions1: google.maps.MarkerOptions = {draggable: false, icon: '../../../assets/clear_globe_icon_80x60.png'};
  markerOptions2: google.maps.MarkerOptions = {draggable: false, icon: '../../../assets/palms_logo.png'};
  markerImage = {  // https://developers.google.com/maps/documentation/javascript/reference/marker#MarkerLabel
    path: this.pinSVGFilled,
    fillOpacity: 1,
    fillColor: this.pinColor,
    strokeWeight: 2,
    strokeColor: "white",
    scale: 2,
};

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
    
    this.markerPositions.push({ position: { lat: 46.6292108, lng: 19.2892695 }, title: 'Palms 6S', icon: this.markerImage });
    this.markerPositions.push({ position: { lat: 46.6981933, lng: 19.0208102 }, title: 'Palms 10D + Palms 5.85', icon: this.markerImage });

    this.markerPositions2.push({ position: { lat: 46.6282108, lng: 19.2892695 }, title: 'Palms 6S', icon: this.markerImage });
    this.markerPositions2.push({ position: { lat: 46.6971933, lng: 19.0208102 }, title: 'Palms 10D + Palms 5.85', icon: this.markerImage });
  }
 
  zoomIn() {
    if (this.zoom < this.options.maxZoom!) this.zoom++;
  }
 
  zoomOut() {
    if (this.zoom > this.options.minZoom!) this.zoom--;
  }
}
