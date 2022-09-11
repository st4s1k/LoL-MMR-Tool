import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OPGGMatchInfo } from 'OPGGMatchInfo';
import { map, Observable } from 'rxjs';
import { ScraperResponse } from 'ScraperModule';
import { ScraperService } from './scrapper-service';

@Injectable()
export class OPGGService {
  constructor(
    private http: HttpClient,
    private scraperService: ScraperService
  ) {}

  getMatchParticipants(url: string): Observable<OPGGMatchInfo> {
    return this.scraperService
      .scrape<ScraperResponse>(url, 'script#__NEXT_DATA__')
      .pipe(
        map((scrapperRoot) => {
          // console.log(scrapperRoot);
          let result = scrapperRoot.result['script#__NEXT_DATA__'];
          return result.length > 0
            ? (JSON.parse(result[0]) as OPGGMatchInfo)
            : {};
        })
      );
  }
}
