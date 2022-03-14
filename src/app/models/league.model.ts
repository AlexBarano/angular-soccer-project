export interface ILeague {
  leagueName: string;
  leagueId: number;
  teams: [
    {
      name: string;
      logo: string;
    }
  ];
}
