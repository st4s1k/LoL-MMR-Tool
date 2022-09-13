import { MmrDTO } from './MmrDTO';

export interface PlayerMmrDTO {
  value: number;
  source: string;
}

export class PlayerDTO {
  name?: string | undefined;
  mmr: MmrDTO = new MmrDTO();

  public getMmr(gameType: string): PlayerMmrDTO | undefined {
    switch (gameType) {
      case 'ranked':
        if (this.mmr.rankedAvg) {
          return { value: this.mmr.rankedAvg, source: 'R' };
        } else if (this.mmr.normalAvg) {
          return { value: this.mmr.normalAvg, source: 'N' };
        } else if (this.mmr.aramAvg) {
          return { value: this.mmr.aramAvg, source: 'A' };
        } else {
          return undefined;
        }
      case 'normal':
        if (this.mmr.normalAvg) {
          return { value: this.mmr.normalAvg, source: 'N' };
        } else if (this.mmr.aramAvg) {
          return { value: this.mmr.aramAvg, source: 'A' };
        } else {
          return undefined;
        }
      case 'aram':
        if (this.mmr.aramAvg) {
          return { value: this.mmr.aramAvg, source: 'A' };
        } else if (this.mmr.normalAvg) {
          return { value: this.mmr.normalAvg, source: 'N' };
        } else {
          return undefined;
        }
      default:
        return undefined;
    }
  }
}
