import { TeamDTO } from './TeamDTO';

interface MatchRowDTO {
  blue: {
    name: string;
    mmr: number;
  };
  red: {
    name: string;
    mmr: number;
  };
}

interface AverageRowDTO {
  blue: number;
  red: number;
}

export class MatchDTO {
  gameType: string;
  blueTeam: TeamDTO = new TeamDTO();
  redTeam: TeamDTO = new TeamDTO();

  constructor(gameType?: string) {
    const input = (gameType ?? '').toLowerCase().trim();
    gameType = input.includes('ranked')
      ? 'ranked'
      : input.includes('normal')
      ? 'normal'
      : input.includes('aram')
      ? 'aram'
      : undefined;
    if (!gameType) {
      throw new Error(`Undefined game type: ${gameType}`);
    }
    this.gameType = gameType;
  }

  public getAvgMmr(gameType: string): AverageRowDTO {
    return {
      blue: this.blueTeam.getAvgMmr(gameType),
      red: this.redTeam.getAvgMmr(gameType),
    };
  }

  public getRows(gameType: string): MatchRowDTO[] {
    const rows: MatchRowDTO[] = [];
    for (let i = 0; i < 5; i++) {
      let redPlayer = this.redTeam.players[i];
      let bluePlayer = this.blueTeam.players[i];
      rows.push({
        red: {
          name: redPlayer.name,
          mmr: TeamDTO.getPlayerMmr(gameType, redPlayer.mmr),
        },
        blue: {
          name: bluePlayer.name,
          mmr: TeamDTO.getPlayerMmr(gameType, bluePlayer.mmr),
        },
      });
    }
    return rows;
  }
}
