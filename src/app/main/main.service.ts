import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class MainComponentService {
  constructor(private http: HttpClient) {}

  fetchLeague(league: any) {
    console.log('fetching league');
    return this.http.get(league).pipe(
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
