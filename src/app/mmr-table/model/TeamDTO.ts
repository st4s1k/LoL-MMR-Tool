import { PlayerDTO } from './PlayerDTO';

export class TeamDTO {
  players: PlayerDTO[] = [
    new PlayerDTO(),
    new PlayerDTO(),
    new PlayerDTO(),
    new PlayerDTO(),
    new PlayerDTO(),
  ];

  public getAvgMmr(gameType: string): number | undefined {
    const mmrArray = this.getTeamMmr(gameType);
    return mmrArray.length > 0
      ? mmrArray.reduce((a, b) => a + b) / mmrArray.length
      : undefined;
  }

  public getTeamMmr(gameType: string): number[] {
    const teamMmr: number[] = [];
    this.players.forEach((player) => {
      var playerMmr = player.getMmr(gameType)?.value;
      if (playerMmr) {
        teamMmr.push(playerMmr);
      }
    });
    return teamMmr;
  }
}
