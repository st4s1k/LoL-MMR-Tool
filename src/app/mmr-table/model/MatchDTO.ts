import { PlayerMmrDTO } from './PlayerDTO';
import { TeamDTO } from './TeamDTO';

interface MatchRowDTO {
  blue: {
    name?: string;
    mmr?: PlayerMmrDTO;
  };
  red: {
    name?: string;
    mmr?: PlayerMmrDTO;
  };
}

export class MatchDTO {
  gameType: string;
  blueTeam: TeamDTO = new TeamDTO();
  redTeam: TeamDTO = new TeamDTO();

  constructor(gameType?: string) {
    const input = (gameType ?? '').toLowerCase().trim();
    this.gameType = input.includes('ranked')
      ? 'ranked'
      : input.includes('normal')
      ? 'normal'
      : input.includes('aram')
      ? 'aram'
      : '';
  }

  public getAvgMmr() {
    return {
      blueTeam: this.blueTeam.getAvgMmr(this.gameType)?.toFixed(),
      redTeam: this.redTeam.getAvgMmr(this.gameType)?.toFixed(),
    };
  }

  public getRows(): MatchRowDTO[] {
    const rows: MatchRowDTO[] = [];
    for (let i = 0; i < 5; i++) {
      let bluePlayer = this.blueTeam.players[i];
      let redPlayer = this.redTeam.players[i];
      let bluePlayerMmr = bluePlayer.getMmr(this.gameType);
      let redPlayerMmr = redPlayer.getMmr(this.gameType);
      rows.push({
        blue: {
          name: bluePlayer.name,
          mmr: bluePlayerMmr,
        },
        red: {
          name: redPlayer.name,
          mmr: redPlayerMmr,
        },
      });
    }
    return rows;
  }
}
