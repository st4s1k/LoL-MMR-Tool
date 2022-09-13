import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { WhatIsMyMMRResponse } from 'WhatIsMyMMR';
import { ScraperService } from './scrapper-service';

@Injectable()
export class WhatIsMyMMRService {
  constructor(private scraperService: ScraperService) {}

  getSummonerMMR(
    summonerName: string,
    region: string
  ): Observable<WhatIsMyMMRResponse> {
    const urlRegion = region.toLowerCase();
    const url = `https://${urlRegion}.whatismymmr.com/api/v1/summoner?name=${summonerName}`;
    return this.scraperService.proxy<WhatIsMyMMRResponse>(url).pipe(
      catchError(() =>
        of({
          ranked: {},
          normal: {},
          ARAM: {},
        } as WhatIsMyMMRResponse)
      )
    );
  }
}
