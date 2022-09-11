import { MmrDTO } from './MmrDTO';
import { PlayerDTO } from './PlayerDTO';

export class TeamDTO {
  players: PlayerDTO[] = [];

  public getAvgMmr(gameType: string) {
    const mmrArray = this.getTeamMmr(gameType);
    return mmrArray.reduce((a, b) => a + b) / mmrArray.length;
  }

  public getNames(): string[] {
    return this.players.map((player) => player.name);
  }

  public getTeamMmr(gameType: string): number[] {
    return this.players.map((player) =>
      TeamDTO.getPlayerMmr(gameType, player.mmr)
    );
  }

  public static getPlayerMmr(gameType: string, mmr: MmrDTO): number {
    switch (gameType) {
      case 'ranked':
        return mmr.rankedAvg ?? mmr.normalAvg ?? mmr.aramAvg ?? 0;
      case 'normal':
        return mmr.normalAvg ?? mmr.aramAvg ?? 0;
      case 'aram':
        return mmr.aramAvg ?? mmr.normalAvg ?? 0;
      default:
        throw new Error(`Undefined game type: ${gameType}`);
    }
  }
}
