import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MainComponentService {
  constructor(private http: HttpClient) {}

  // this function returns the
  fetchLeague(leagueName: string): Observable<any[]> {
    return this.http
      .get(
        'https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=' +
          leagueName
      )
      .pipe(
        map((data) => {
          const league = Object.values(data);
          const leagueExtracted: any[] = [];
          league.forEach((leagueArray: any[]) => {
            //for some reason we need to extract the with double looping
            leagueArray.forEach((league: any) => {
              leagueExtracted.push(league);
            });
          });
          return leagueExtracted;
        })
      );
  }
}