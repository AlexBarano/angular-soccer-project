import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {} from 'googlemaps';

const MOVEO_LOCATION = { lat: 32.06525320784879, lng: 34.771908335816505 };
const MY_LOCATION = { lat: 32.073942567885524, lng: 35.06544633262209 };
const MY_MAP_ID = '1ac03278f6501c1';
@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements OnInit {
  autocomplete!: google.maps.places.Autocomplete;
  map!: google.maps.Map;
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  readonly selectedMode = google.maps.TravelMode.DRIVING;
  @ViewChild('map') mapElement!: ElementRef;
  @ViewChild('input') input!: ElementRef;
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.initMap();
    this.directionsRenderer.setMap(this.map);
    this.initAutocomplete();
  }
  onSearch() {
    var lat: number;
    var lng: number;
    try {
      lat = this.autocomplete.getPlace().geometry?.location.lat() as number;
      lng = this.autocomplete.getPlace().geometry?.location.lng() as number;
      new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: this.map,
      });
      this.map.panTo(new google.maps.LatLng(lat, lng));
    } catch (error: unknown) {
      console.log(error);
    }
  }
  private initAutocomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.input.nativeElement
    );
    this.autocomplete.setFields([
      'address_components',
      'geometry',
      'icon',
      'name',
    ]);
  }
  private initMap() {
    const mapProperties = {
      center: new google.maps.LatLng(MOVEO_LOCATION),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapId: MY_MAP_ID,
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
  onDirection() {
    this.directionsService.route(
      {
        origin: MY_LOCATION,
        destination: MOVEO_LOCATION,
        travelMode: this.selectedMode,
      },
      (response) => {
        this.directionsRenderer.setDirections(response);
      }
    );
  }
}
