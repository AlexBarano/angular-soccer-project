import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITeam } from '../models/team.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  savedTeams: BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>([]);
  constructor() {}

  saveTeam(team: ITeam): boolean {
    const savedTeams: ITeam[] = JSON.parse(
      localStorage.getItem('savedTeams') || '[]'
    ) as ITeam[];
    const savedTeam: ITeam = { name: team.name, logo: team.logo };
    // check if team already in local storage (the array)
    if (
      !savedTeams.find((team: ITeam) => {
        return team.logo === savedTeam.logo && team.name === savedTeam.name;
      })
    ) {
      if (savedTeams.length >= 5) {
        // de-queue
        savedTeams.shift();
      }
      savedTeams.push(savedTeam);
      localStorage.setItem('savedTeams', JSON.stringify(savedTeams));
      this.savedTeams.next(savedTeams);
      return true;
    }
    return false;
  }
  loadSavedTeams() {
    const savedTeams: ITeam[] = JSON.parse(
      localStorage.getItem('savedTeams') || '[]'
    ) as ITeam[];
    this.savedTeams.next(savedTeams);
  }
}
