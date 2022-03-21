import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MapsService } from 'src/app/services/maps.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss'],
})
export class MapPageComponent implements OnInit {
  @ViewChild('map') mapElement!: ElementRef;
  @ViewChild('input') input!: ElementRef;
  places: string[] = [];
  directionDetails: { duration: string; distance: string } = {
    distance: '',
    duration: '',
  };
  constructor(private mapsService: MapsService) {}

  ngOnInit(): void {
    this.mapsService.place.subscribe((place) => {
      if (place !== '') {
        this.places.push(place);
      }
    });
    this.mapsService.directionDetails.subscribe((details) => {
      this.directionDetails = details;
    });
  }
  ngAfterViewInit() {
    this.mapsService.initMap(this.mapElement);
    this.mapsService.initAutocomplete(this.input.nativeElement);
  }
  onSearch() {
    this.mapsService.onSearch();
    this.input.nativeElement.value = '';
  }
}
