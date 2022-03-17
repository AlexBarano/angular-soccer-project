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
  markers: google.maps.Marker[] = [];
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
      const marker: google.maps.Marker = new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: this.map,
      });
      this.map.panTo(new google.maps.LatLng(lat, lng));
      this.markers.push(marker);
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
    this.autocomplete.setComponentRestrictions({ country: ['il'] });
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
    const centerControlDiv = document.createElement('div');
    this.centerControl(centerControlDiv);
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      centerControlDiv
    );
  }
  onDirection(): void {
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
  // sets all the params on the button
  private centerControl(controlDiv: Element): void {
    // Set CSS for the control border.
    const controlUI = document.createElement('div');

    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginTop = '8px';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    const controlText = document.createElement('div');

    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Directions';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', () => {
      this.onDirection();
    });
  }
  clearMarkers() {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
  }
}
