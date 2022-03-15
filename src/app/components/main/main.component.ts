import { Component, OnInit } from '@angular/core';
import { ITeam } from '../../models/team.model';

@Component({
  selector: 'app-main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  leagues: { url: string; name: string }[] = [
    { url: 'English%20Premier%20League', name: 'English Premier' },
    {
      url: 'English%20League%20Championship',
      name: 'English Championship',
    },
    {
      url: 'Scottish%20Premier%20League',
      name: 'Scottish Premier',
    },
    { url: 'German%20Bundesliga', name: 'German Bundesliga' },
    { url: 'Italian%20Serie%20A', name: 'Intalian Serie' },
  ];
  teams: ITeam[] = [];
  loading: boolean = false;
  loadedLeague: string = '';
  constructor() {}

  ngOnInit(): void {}
  loadLeague(value: { teams: ITeam[]; leagueName: string }): void {
    this.loadedLeague = value.leagueName;
    this.teams = value.teams;
  }
  loadingUpdate(loading: boolean) {
    this.loading = loading;
  }
}
