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
  ngOnInit(): void {}

  loadTeamsOfLeague(leagueUrl: string): void {
    this.mainComponentService.fetchTeams(leagueUrl).subscribe((teams) => {
      this.onLeaguePick.emit({ teams: teams, leagueName: this.leagueName });
    });
    this.onLeaguePick.emit({ teams: [], leagueName: '' });
  }
}
