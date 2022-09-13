import { Injectable } from '@angular/core';
import { CurrentGameInfo, Summoner } from 'RiotApi';
import { Observable } from 'rxjs';
import { ScraperService } from './scrapper-service';

@Injectable()
export class RiotApiService {
  constructor(private scraperService: ScraperService) {}

  riotRegions = [
    'EUW1',
    'BR1',
    'EUN1',
    'JP1',
    'KR',
    'LA1',
    'LA2',
    'NA1',
    'OC1',
    'RU',
    'TR1',
  ];

  getSummonerByName(
    summonerName: string,
    region: string
  ): Observable<Summoner> {
    let urlRegion = this.getRegion(region).toLowerCase();
    return this.scraperService.proxy<Summoner>(
      `https://${urlRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`
    );
  }

  getCurrentGameInfo(
    encryptedSummonerId: string,
    region: string
  ): Observable<CurrentGameInfo> {
    let riotRegion = this.getRegion(region);
    return this.scraperService.proxy<CurrentGameInfo>(
      `https://${riotRegion}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${encryptedSummonerId}`
    );
  }

  private getRegion(region: string): string {
    let foundRegion = this.riotRegions.find(
      (riotRegion) =>
        riotRegion.toLowerCase().includes(region.toLowerCase()) ||
        (riotRegion.valueOf() == 'EUN1' && region.valueOf() == 'EUNE')
    );
    if (foundRegion) {
      return foundRegion;
    } else {
      throw new Error(`Unable to find this region: ${region}`);
    }
  }
}
