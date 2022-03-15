import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainComponentService } from '../main/main.service';
import { ITeam } from '../models/team.model';

@Component({
  selector: 'app-league-tab',
  templateUrl: './league-tab.component.html',
  styleUrls: ['./league-tab.component.scss'],
})
export class LeagueTabComponent implements OnInit {
  constructor(private mainComponentService: MainComponentService) {}
  @Input() leagueName: string = '';
  @Input() leagueUrl: string = '';
  @Output() onLeaguePick = new EventEmitter<ITeam[]>();
  ngOnInit(): void {}

  loadTeamsOfLeague(leagueUrl: string): void {
    this.mainComponentService
      .fetchLeague(leagueUrl)
      .subscribe((leagueMetaData) => {
        let teams: ITeam[] = [];
        leagueMetaData.forEach((teamMetaData) => {
          teams.push({
            name: teamMetaData['strTeam'],
            logo: teamMetaData['strTeamBadge'],
          });
        });
        this.onLeaguePick.emit(teams);
      });
    this.onLeaguePick.emit([]);
  }
}
