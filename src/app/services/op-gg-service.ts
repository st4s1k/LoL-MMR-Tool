import { Injectable } from '@angular/core';
import { OPGGMatchInfo } from 'OPGGMatchInfo';
import { map, Observable, throwError } from 'rxjs';
import { ScraperResponse } from 'ScraperModule';
import { ScraperService } from './scrapper-service';

export class InvalidUrlError implements Error {
  name: string = 'InvalidUrlError';
  message: string;
  stack?: string;

  constructor(message?: string) {
    this.message = message ?? '';
  }
}

@Injectable()
export class OPGGService {
  constructor(private scraperService: ScraperService) {}

  getMatchParticipants(url: string | null): Observable<OPGGMatchInfo> {
    const urlRegex =
      /https:\/\/(\w+)\.op\.gg\/summoners\/(\w+)\/(.+)\/matches\/(.+)\/(\d+)/gm;

    if (!url || !urlRegex.test(url)) {
      return throwError(() => {
        throw new InvalidUrlError();
      });
    }

    return this.scraperService
      .scrape<ScraperResponse>(url, 'script#__NEXT_DATA__')
      .pipe(
        map((scrapperRoot) => {
          let result = scrapperRoot.result['script#__NEXT_DATA__'];
          return result.length > 0
            ? (JSON.parse(result[0]) as OPGGMatchInfo)
            : {};
        })
      );
  }
}
