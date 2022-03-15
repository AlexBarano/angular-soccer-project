import { Component, OnInit } from '@angular/core';
import { ITeam } from '../models/team.model';

@Component({
  selector: 'app-main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  leagues: string[][] = [
    ['English%20Premier%20League', 'English Premier'],
    ['English%20League%20Championship', 'English Championship'],
    ['Scottish%20Premier%20League', 'Scottish Premier'],
    ['German%20Bundesliga', 'German Bundesliga'],
    ['Italian%20Serie%20A', 'Intalian Serie'],
  ];
  teams: ITeam[] = [];
  constructor() {}

  ngOnInit(): void {}
  loadTeams(teams: ITeam[]): void {
    this.teams = teams;
  }
}
