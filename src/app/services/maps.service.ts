import { ElementRef, Injectable } from '@angular/core';
import {} from 'googlemaps';
import { BehaviorSubject } from 'rxjs';

const MOVEO_LOCATION = { lat: 32.06525320784879, lng: 34.771908335816505 };
const MY_LOCATION = { lat: 32.073942567885524, lng: 35.06544633262209 };
const MY_MAP_ID = '1ac03278f6501c1';

@Injectable({ providedIn: 'root' })
export class MapsService {
  autocomplete!: google.maps.places.Autocomplete;
  map!: google.maps.Map;
  place: BehaviorSubject<string> = new BehaviorSubject<string>('');
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  readonly selectedMode = google.maps.TravelMode.DRIVING;
  constructor() {}

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
      this.place.next(this.autocomplete.getPlace().name);
    } catch (error: unknown) {
      console.log(error);
    }
  }
  initAutocomplete(input: HTMLInputElement) {
    this.directionsRenderer.setMap(this.map);
    this.autocomplete = new google.maps.places.Autocomplete(input);
    this.autocomplete.setFields([
      'address_components',
      'geometry',
      'icon',
      'name',
    ]);
  }
  initMap(mapElement: ElementRef) {
    const mapProperties = {
      center: new google.maps.LatLng(MOVEO_LOCATION),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapId: MY_MAP_ID,
      disableDefaultUI: true,
    };
    this.map = new google.maps.Map(mapElement.nativeElement, mapProperties);
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
