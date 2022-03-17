import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {} from 'googlemaps';

const MOVEO_LOCATION = { lat: 32.06525320784879, lng: 34.771908335816505 };

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('map') mapElement!: ElementRef;
  map!: google.maps.Map;
  autocomplete!: google.maps.places.Autocomplete;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    const mapProperties = {
      center: new google.maps.LatLng(MOVEO_LOCATION),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(
      this.mapElement.nativeElement,
      mapProperties
    );
    new google.maps.Marker({
      position: MOVEO_LOCATION,
      map: this.map,
    });
  }
}
