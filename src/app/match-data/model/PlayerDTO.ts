import { MmrDTO } from './MmrDTO';

export class PlayerDTO {
  name: string;
  mmr: MmrDTO;

  constructor(name: string, mmr: MmrDTO) {
    this.name = name;
    this.mmr = mmr;
  }
}
