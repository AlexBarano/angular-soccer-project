import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class MainComponentService {
  private maxTeams: number = 5;
  constructor(private http: HttpClient) {}

  fetchLeagues() {
    return this.http
      .get(
        'https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=English%20Premier%20League'
      )
      .pipe(
        map((data) => {
          const newLeagues = [];
          let teamCounter: number = 0;
          for (let key in data) {
            if (teamCounter >= this.maxTeams) {
              return newLeagues;
            }
            if (data.hasOwnProperty(key)) {
              newLeagues.push({ ...data, id: key });
              teamCounter++;
            }
          }
          return newLeagues;
        })
      );
  }
}
