import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Participant } from 'OPGGMatchInfo';
import { WhatIsMyMMRService } from '../services/mmr-service';
import { OPGGService } from '../services/op-gg-service';
import { MatchDTO } from './model/MatchDTO';
import { MmrDTO } from './model/MmrDTO';
import { PlayerDTO } from './model/PlayerDTO';

@Component({
  selector: 'app-match-data',
  templateUrl: './match-data.component.html',
  styleUrls: ['./match-data.component.css'],
})
export class MatchDataComponent implements OnInit {
  public matchDTO: MatchDTO = {} as MatchDTO;
  public matchUrlForm = this.formBuilder.group({
    matchUrl:
      'https://euw.op.gg/summoners/euw/LowZero/matches/xX1o0DE1RCUcTyLI2XeuU6pOv7XtSbDoM25NfV2anvk%3D/1662756100000',
  });

  constructor(
    private opGGService: OPGGService,
    private whatIsMyMMRService: WhatIsMyMMRService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  showParticipants() {
    var url = this.matchUrlForm.value?.matchUrl || '';
    console.log(url);
    if (url.trim().length > 0) {
      this.opGGService.getMatchParticipants(url).subscribe((matchInfo) => {
        console.log(matchInfo);
        let participants = matchInfo.props?.pageProps.game.participants || [];
        console.log(participants);
        let region = matchInfo.props?.pageProps.region;
        let gameType = matchInfo.props?.pageProps.game.queue_info.game_type;
        if (region && gameType) {
          this.matchDTO = this.toMatch(participants, region, gameType);
          console.log(this.matchDTO);
        } else {
          console.log(
            `Undefined region [${region}] or game_type [${gameType}]`
          );
        }
      });
    }
  }

  toMatch(array: Participant[], region: string, gameType: string): MatchDTO {
    return array.reduce((match, participant) => {
      let summonerName = participant.summoner.name;
      let mmr: MmrDTO = new MmrDTO(0, 0, 0);
      let player: PlayerDTO = new PlayerDTO(summonerName, mmr);
      this.whatIsMyMMRService
        .getSummonerMMR(summonerName, region)
        .subscribe((mmrResponse) => {
          mmr.rankedAvg = mmrResponse.ranked.avg;
          mmr.normalAvg = mmrResponse.normal.avg;
          mmr.aramAvg = mmrResponse.ARAM.avg;
          console.log(player);
        });
      switch (participant.team_key) {
        case 'RED':
          match.redTeam.players.push(player);
          break;
        case 'BLUE':
          match.blueTeam.players.push(player);
          break;
        default:
          throw new Error(`Undefined team key ${participant.team_key}`);
      }
      return match;
    }, new MatchDTO(gameType));
  }
}
