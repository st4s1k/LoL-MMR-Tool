import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cheerio from 'cheerio';
import { from, Observable, of } from 'rxjs';

@Injectable()
export class OPGGService {
  constructor(private http: HttpClient) {}

  getMatchParticipants(url: string): Observable<string[]> {
    const regexMatches = url.match(/https:\/\/(\w+)\.op\.gg/) || [];
    if (regexMatches.length != 2) {
      return of([]);
    }
    const server = regexMatches[1];
    console.log(server);
    const options: RequestInit = {
      headers: {
        authority: `${server}.op.gg`,
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'en-US,en;q=0.9',
      },
      method: 'GET',
      mode: 'no-cors',
    };

    return from(
      fetch(url, options)
        .then((response) => response.text())
        .then((content) => {
          console.log(content);
          const $ = cheerio.load(content);
          const participants = $('div.participants > ul > li > div.name')
            .toArray()
            .map((element) => {
              var text = $(element).text().trim();
              console.log(text);
              return text;
            });
          console.log(participants);
          return participants;
        })
    );
  }
}
