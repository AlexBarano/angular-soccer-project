import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-league-tab',
  templateUrl: './league-tab.component.html',
  styleUrls: ['./league-tab.component.scss'],
})
export class LeagueTabComponent implements OnInit {
  constructor() {}
  @Input() leagueName: string = '';
  ngOnInit(): void {}
}
