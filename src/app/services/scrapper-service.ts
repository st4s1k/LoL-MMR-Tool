import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class ScraperService {
  constructor(private http: HttpClient) {}

  // scraperUrl = 'http://127.0.0.1:8787/';
  scraperUrl = 'https://scraper.psychoprolapse.workers.dev';

  scrape<R>(
    url: string,
    selector: string,
    headers?: {
      [header: string]: string | string[];
    }
  ): Observable<R> {
    return this.http
      .get<R>(this.scraperUrl, {
        headers: headers,
        params: {
          selector: selector,
          scrape: 'text',
          url: url,
        },
      })
      .pipe(
        map((scrapperResponse) => {
          // console.log(
          //   `Scraper response:\n${JSON.stringify(scrapperResponse, null, 2)}`
          // );
          return scrapperResponse;
        })
      );
  }

  proxy<R>(
    url: string,
    headers?: {
      [header: string]: string | string[];
    }
  ): Observable<R> {
    return this.http
      .get<R>(this.scraperUrl, {
        headers: headers,
        params: {
          url: url,
        },
      })
      .pipe(
        map((scrapperResponse) => {
          // console.log(
          //   `Proxy response:\n${JSON.stringify(scrapperResponse, null, 2)}`
          // );
          return scrapperResponse;
        })
      );
  }
}
