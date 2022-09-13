export class MmrDTO {
  rankedAvg?: number;
  normalAvg?: number;
  aramAvg?: number;

  constructor(rankedAvg?: number, normalAvg?: number, aramAvg?: number) {
    this.rankedAvg = rankedAvg;
    this.normalAvg = normalAvg;
    this.aramAvg = aramAvg;
  }
}
