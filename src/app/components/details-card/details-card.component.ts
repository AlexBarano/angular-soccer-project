import { Component, Input, OnInit } from '@angular/core';
import { ITeam } from 'src/app/models/team.model';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss'],
})
export class DetailsCardComponent implements OnInit {
  @Input() teamName: string = '';
  @Input() teamLogo: string = '';
  constructor() {}

  ngOnInit(): void {}
  // this function saves a selected team to the local storage
  saveTeam(): void {
    const savedTeams: ITeam[] = JSON.parse(
      localStorage.getItem('savedTeams') || '[]'
    ) as ITeam[];
    const savedTeam: ITeam = { name: this.teamName, logo: this.teamLogo };
    // check if team already in local storage (the array)
    if (
      !savedTeams.find((team: ITeam) => {
        return team.logo === savedTeam.logo && team.name === savedTeam.name;
      })
    ) {
      if (savedTeams.length >= 5) {
        // de-queue
        savedTeams.shift();
      }
      savedTeams.push(savedTeam);
      localStorage.setItem('savedTeams', JSON.stringify(savedTeams));
      alert(`Added the team ${savedTeam.name} to your favorites!`);
    }
  }
}
