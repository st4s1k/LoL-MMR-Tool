import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OPGGMatchInfo } from 'OPGGMatchInfo';
import { from, Observable, of } from 'rxjs';

@Injectable()
export class OPGGService {
  constructor(private http: HttpClient) {}

  getMatchParticipants(url: string): Observable<OPGGMatchInfo> {
    const regexMatches = url.match(/https:\/\/(\w+)\.op\.gg/) || [];
    if (regexMatches.length != 2) {
      return of();
    }
    const server = regexMatches[1];
    console.log(`server: ${server}`);
    console.log(`url: ${url}`);

    var options: RequestInit = {
      headers: {
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'max-age=0',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'sec-gpc': '1',
        'upgrade-insecure-requests': '1',
      },
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    return from(
      fetch(url, options)
        .then((response) => response.text())
        .then((htmlString) => {
          var doc = document.implementation.createHTMLDocument();
          doc.open();
          doc.write(htmlString);
          var nextData = JSON.parse(
            doc.getElementById('__NEXT_DATA__')?.textContent || ''
          );
          var matchInfo: OPGGMatchInfo = nextData;
          doc.close();
          return matchInfo;
        })
    );

    // return this.http.get<String>(url).pipe(
    //   map(response => {
    //     var htmlString = response.toString();
    //     var doc = document.implementation.createHTMLDocument();
    //     doc.open();
    //     doc.write(htmlString);
    //     var nextData = JSON.parse(doc.getElementById('__NEXT_DATA__')?.textContent || '');
    //     var matchInfo: OPGGMatchInfo = nextData
    //     doc.close();
    //     return matchInfo;
    //   })
    // );
  }
}
