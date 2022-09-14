declare module 'RiotApi' {
  export interface Summoner {
    id: string;
    accountId: string;
    puuid: string;
    name: string;
    profileIconId: number;
    revisionDate: number;
    summonerLevel: number;
  }

  export interface BannedChampion {
    pickTurn: number;
    championId: number;
    teamId: number;
  }

  export interface Observer {
    encryptionKey: string;
  }

  export interface Perks {
    perkIds: number[];
    perkStyle: number;
    perkSubStyle: number;
  }

  export interface GameCustomizationObject {
    category: string;
    content: string;
  }

  export interface CurrentGameParticipant {
    championId: number;
    perks: Perks;
    profileIconId: number;
    bot: boolean;
    teamId: number;
    summonerName: string;
    summonerId: string;
    spell1Id: number;
    spell2Id: number;
    gameCustomizationObjects: GameCustomizationObject[];
  }

  export interface CurrentGameInfo {
    gameId: number;
    gameType: string;
    gameStartTime: number;
    mapId: number;
    gameLength: number;
    platformId: string;
    gameMode: string;
    bannedChampions: BannedChampion[];
    gameQueueConfigId: number;
    observers: Observer;
    participants: CurrentGameParticipant[];
  }
}
