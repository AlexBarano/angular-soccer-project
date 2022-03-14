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
  constructor(private mainComponentService: MainComponentService) {}

  ngOnInit(): void {
    this.mainComponentService.fetchLeagues().subscribe((leagues) => {
      console.log(leagues);
    });
  }
}
