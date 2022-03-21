import { ElementRef, Injectable } from '@angular/core';
import {} from 'googlemaps';
import { BehaviorSubject } from 'rxjs';

const MOVEO_LOCATION = { lat: 32.06525320784879, lng: 34.771908335816505 };
const MY_LOCATION = { lat: 32.073942567885524, lng: 35.06544633262209 };
const MY_MAP_ID = '1ac03278f6501c1';
const DEFAULT_MAP_ID = 'c51bbc21f00746b2';
const MOVEO_ICON =
  'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1469622513/pf5lnfgaaxe8sptd6dgk.png';

@Injectable({ providedIn: 'root' })
export class MapsService {
  autocomplete!: google.maps.places.Autocomplete;
  map!: google.maps.Map;
  mapElement!: ElementRef;
  currStyle: string = MY_MAP_ID;
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
  initMap(mapElement: ElementRef, mapId: string | undefined = undefined) {
    const mapProperties = {
      center: new google.maps.LatLng(MOVEO_LOCATION),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapId: mapId || MY_MAP_ID,
      disableDefaultUI: true,
    };
    this.map = new google.maps.Map(mapElement.nativeElement, mapProperties);
    this.markers.forEach((marker) => {
      new google.maps.Marker({
        map: this.map,
        position: marker.getPosition()?.toJSON(),
      });
    });
    this.mapElement = mapElement;
    this.initMoveoMarker();
    this.initBtns();
  }

  private initBtns() {
    // directions btn
    const directionsDiv = document.createElement('div');
    this.centerControl(directionsDiv, 'Directions');
    directionsDiv.addEventListener('click', () => {
      this.onDirection();
    });
    // switch styles btn
    const switchStyle = document.createElement('div');
    this.centerControl(switchStyle, 'Switch Styles');
    switchStyle.addEventListener('click', () => {
      this.onSwitchStyle();
    });
    // center btn
    const centerDiv = document.createElement('div');
    this.centerControl(centerDiv, 'Show Markers');
    centerDiv.addEventListener('click', () => {
      this.onShowMarkers();
    });
    // clear btn
    const clearDiv = document.createElement('div');
    this.centerControl(clearDiv, 'Clear');
    clearDiv.addEventListener('click', () => {
      this.onClear();
    });
    // here we push to the map the btns
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      directionsDiv
    );
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerDiv);
    this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(clearDiv);
    this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(switchStyle);
  }
  private onDirection(): void {
    this.directionsService.route(
      {
        origin: MY_LOCATION,
        destination: MOVEO_LOCATION,
        travelMode: this.selectedMode,
      },
      (response) => {
        console.log('dist: ', response.routes[0].legs[0].distance);
        console.log('time: ', response.routes[0].legs[0].duration);
        this.directionsRenderer.setDirections(response);
      }
    );
  }

  private initMoveoMarker() {
    const moveoMarker: google.maps.Marker = new google.maps.Marker({
      position: MOVEO_LOCATION,
      map: this.map,
      label: 'Moveo',
      // icon: {
      //   url: MOVEO_ICON,
      //   // size: new google.maps.Size(32, 32),
      //   // origin: new google.maps.Point(32, 32),
      // },
    });
    this.markers.push(moveoMarker);
  }

  // sets all the styles on the button
  private centerControl(controlDiv: HTMLDivElement, btnName: string): void {
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
    controlText.innerHTML = btnName;
    controlUI.appendChild(controlText);
  }

  private onClear() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
    this.initMoveoMarker();
  }
  private onShowMarkers() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < this.markers.length; i++) {
      bounds.extend(this.markers[i].getPosition()!);
    }
    this.map.fitBounds(bounds);
  }
  private onSwitchStyle() {
    switch (this.currStyle) {
      case MY_MAP_ID:
        this.initMap(this.mapElement, DEFAULT_MAP_ID);
        this.currStyle = DEFAULT_MAP_ID;
        break;
      case DEFAULT_MAP_ID:
        this.initMap(this.mapElement, MY_MAP_ID);
        this.currStyle = MY_MAP_ID;
        break;
      default:
        break;
    }
  }
}
