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
  saveTeam(): void {
    //const savedTeams: ITeam[] = JSON.parse(localStorage.getItem('savedTeams'));
    const savedTeams: ITeam[] = [];
    const savedTeam: ITeam = { name: this.teamName, logo: this.teamLogo };
    savedTeams.push(savedTeam);
    localStorage.setItem('savedTeams', JSON.stringify(savedTeams));
  }
}
