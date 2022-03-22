import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITeam } from '../models/team.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  savedTeams: BehaviorSubject<ITeam[]> = new BehaviorSubject<ITeam[]>([]);
  constructor() {
    const savedTeams: ITeam[] = JSON.parse(
      localStorage.getItem('savedTeams') || '[]'
    ) as ITeam[];
    this.savedTeams.next(savedTeams);
  }

  saveTeam(savedTeam: ITeam): boolean {
    const savedTeams: ITeam[] = JSON.parse(
      localStorage.getItem('savedTeams') || '[]'
    ) as ITeam[];
    // check if team already in local storage (the array)
    if (
      !savedTeams.find((team: ITeam) => {
        return savedTeam.logo === team.logo && savedTeam.name === team.name;
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
  deleteTeam(deletedTeam: ITeam) {
    const savedTeams: ITeam[] = JSON.parse(
      localStorage.getItem('savedTeams') || '[]'
    ) as ITeam[];
    const newSavedTeams: ITeam[] = savedTeams.filter((savedTeam) => {
      return (
        deletedTeam.logo !== savedTeam.logo &&
        deletedTeam.name !== savedTeam.name
      );
    });
    localStorage.setItem('savedTeams', JSON.stringify(newSavedTeams));
    this.savedTeams.next(newSavedTeams);
  }
}
