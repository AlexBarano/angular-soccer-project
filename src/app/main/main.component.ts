import { Component, OnInit } from '@angular/core';
import { ILeague } from '../models/league.model';
import { MainComponentService } from './main.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  leagues = [
    ['English%20Premier%20League', 'English Premier'],
    ['English%20League%20Championship', 'English Championship'],
    ['Scottish%20Premier%20League', 'Scottish Premier'],
    ['German%20Bundesliga', 'German Bundesliga'],
    ['Italian%20Serie%20A', 'Intalian Serie'],
  ];

  constructor(private mainComponentService: MainComponentService) {}

  ngOnInit(): void {}
  loadLeagueData(leagueUrl: string): ILeague[] {
    console.log('loading league data');
    const leagues: ILeague[] = [];

    this.mainComponentService
      .fetchLeague(leagueUrl)
      .subscribe((leagueMetaData) => {
        const leagueId: number = leagueMetaData[0]['idLeague'];
        const leagueName: string = leagueMetaData[0]['strLeague'];
        let teams: { name: string; logo: string }[] = [];
        leagueMetaData.forEach((teamMetaData, index) => {
          teams.push({
            name: teamMetaData['strTeam'],
            logo: teamMetaData['strTeamBadge'],
          });
        });
        const league: ILeague = {
          leagueId: leagueId,
          leagueName: leagueName,
          teams: teams,
        };
        leagues.push(league);
        console.log(leagues);
      });
    return leagues;
  }
}
