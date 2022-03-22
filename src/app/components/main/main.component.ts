import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localstorage.service';
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
  savedTeams: ITeam[] = [];
  loading: boolean = false;
  loadedLeague: string = '';
  constructor(
    private mainService: MainComponentService,
    private localstorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.mainService.loadingSubject.subscribe((loading: boolean) => {
      this.loading = loading;
    });
    this.localstorageService.savedTeams.subscribe((teams: ITeam[]) => {
      this.savedTeams = teams;
    });
    this.localstorageService.loadSavedTeams();
  }
  ngOnDestroy(): void {
    //this.mainService.loadingSubject.unsubscribe();
  }
  loadLeague(value: { teams: ITeam[]; leagueName: string }): void {
    this.loadedLeague = value.leagueName;
    this.teams = value.teams;
  }
}
