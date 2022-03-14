import { Component, OnInit } from '@angular/core';
import { ILeague } from '../models/league.model';
import { MainComponentService } from './main.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  leaguesUrls = [
    'https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=English%20Premier%20League',
    'https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=English%20League%20Championship',
    'https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=Scottish%20Premier%20League',
    'https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=German%20Bundesliga',
    'https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=Italian%20Serie%20A',
  ];

  constructor(private mainComponentService: MainComponentService) {}

  ngOnInit(): void {}
  loadLeagueData(leagueUrl: string) {
    console.log('loading league data');
    this.mainComponentService
      .fetchLeague(leagueUrl)
      .subscribe((leagueMetaData) => {
        const league: ILeague = {
          leagueId: 123,
          leagueName: '123',
          teams: [
            {
              name: 'asddd',
              logo: 'fff',
            },
          ],
        };
        console.log(leagueMetaData);
      });
  }
}
