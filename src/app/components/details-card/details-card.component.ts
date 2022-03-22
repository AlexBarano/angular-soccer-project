import { Component, Input, OnInit } from '@angular/core';

import { ITeam } from 'src/app/models/team.model';
import { LocalStorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss'],
})
export class DetailsCardComponent implements OnInit {
  @Input() teamName: string = '';
  @Input() teamLogo: string = '';

  constructor(private localstorage: LocalStorageService) {}

  ngOnInit(): void {}
  // this function saves a selected team to the local storage
  saveTeam(): void {
    if (
      this.localstorage.saveTeam({ name: this.teamName, logo: this.teamLogo })
    ) {
      alert(`Added the team ${this.teamName} to your favorites!`);
    } else {
      alert(`Team ${this.teamName} already saved`);
    }
  }
}
