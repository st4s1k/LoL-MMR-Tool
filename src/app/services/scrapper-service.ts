import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class ScraperService {
  constructor(private http: HttpClient) {}

  scrape<R>(url: string, selector?: string): Observable<R> {
    let params;
    if (selector) {
      params = {
        selector: selector,
        scrape: 'text',
        url: url,
      };
    } else {
      params = {
        scrape: 'text',
        url: url,
      };
    }
    return this.http
      .get<R>('https://scraper.psychoprolapse.workers.dev', { params: params })
      // .get<R>('http://127.0.0.1:8787', { params: params })
      .pipe(
        map((scrapperResponse) => {
          // console.log(scrapperResponse);
          return scrapperResponse;
        })
      );
  }
}
