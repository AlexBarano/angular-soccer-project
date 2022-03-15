import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MainComponentService } from '../../services/main.service';
import { ITeam } from '../../models/team.model';

@Component({
  selector: 'app-league-tab',
  templateUrl: './league-tab.component.html',
  styleUrls: ['./league-tab.component.scss'],
})
export class LeagueTabComponent implements OnInit {
  constructor(private mainComponentService: MainComponentService) {}
  @Input() leagueName: string = '';
  @Input() leagueUrl: string = '';
  @Output() onLeaguePick = new EventEmitter<{
    teams: ITeam[];
    leagueName: string;
  }>();
  @Output() onLoading = new EventEmitter<boolean>();
  ngOnInit(): void {}

  loadTeamsOfLeague(leagueUrl: string): void {
    this.onLoading.emit(true);
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
        this.onLeaguePick.emit({ teams: teams, leagueName: this.leagueName });
        this.onLoading.emit(false);
        return;
      });
    this.onLeaguePick.emit({ teams: [], leagueName: '' });
    this.onLoading.emit(false);
  }
}
