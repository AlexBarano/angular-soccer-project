import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class MainComponentService {
  constructor(private http: HttpClient) {}

  fetchLeague(leagueName: any) {
    console.log('fetching league');
    return this.http
      .get(
        'https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=' +
          leagueName
      )
      .pipe(
        map((data) => {
          const teams = Object.values(data);
          const teamsExtracted: any[] = [];
          teams.forEach((teamsArray: any[]) => {
            //for some reason we need to extract the with double looping
            teamsArray.forEach((team: any) => {
              teamsExtracted.push(team);
            });
          });
          return teamsExtracted;
        })
      );
  }
}
