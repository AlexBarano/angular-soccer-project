import { Component, OnInit } from '@angular/core';
import { ILeague } from '../models/league.model';
import { MainComponentService } from './main.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  leagues: ILeague[] = [];
  private maxTeams: number = 5;

  constructor(private mainComponentService: MainComponentService) {}

  ngOnInit(): void {
    this.mainComponentService.fetchLeagues().subscribe((fetchedLeagues) => {
      // let teamsCount: number = 0;
      // fetchedLeagues.forEach((leagueData) => {
      //   const league:ILeague = {};
      //   this.leagues.push(league);
      //   teamsCount++;
      //   if (teamsCount > this.maxTeams) {
      //     return;
      //   }
      //});
      console.log(fetchedLeagues);
    });
  }
}
