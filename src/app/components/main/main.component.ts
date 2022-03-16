import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MainComponentService } from 'src/app/services/main.service';
import { ITeam } from '../../models/team.model';

@Component({
  selector: 'app-main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
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
  constructor(
    private authService: AuthService,
    private mainService: MainComponentService
  ) {}

  ngOnInit(): void {
    this.mainService.loadingSubject.subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }
  ngOnDestroy(): void {
    //this.mainService.loadingSubject.unsubscribe();
  }
  loadLeague(value: { teams: ITeam[]; leagueName: string }): void {
    this.loadedLeague = value.leagueName;
    this.teams = value.teams;
  }
  logOut() {
    this.authService.logOut();
  }
}
