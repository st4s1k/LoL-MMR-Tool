declare module 'WhatIsMyMMR' {
  export interface TierData {
    name?: string;
    avg?: number;
    min?: number;
    max?: number;
  }

  export interface Historical {
    avg?: number;
    err?: number;
    warn?: boolean;
    timestamp?: number;
  }

  export interface HistoricalTierData {
    name?: string;
    avg?: number;
    avgCount?: number;
    min?: number;
    max?: number;
  }

  export interface MMR {
    avg?: number;
    err?: number;
    warn?: boolean;
    summary?: string;
    closestRank?: string;
    percentile?: number;
    tierData?: TierData[];
    timestamp?: number;
    historical?: Historical[];
    historicalTierData?: HistoricalTierData[];
  }

  export interface WhatIsMyMMRResponse {
    ranked: MMR;
    normal: MMR;
    ARAM: MMR;
  }
}
