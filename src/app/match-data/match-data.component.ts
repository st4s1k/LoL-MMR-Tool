import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Participant } from 'OPGGMatchInfo';
import { catchError, of } from 'rxjs';
import { MatchDTO } from '../mmr-table/model/MatchDTO';
import { PlayerDTO } from '../mmr-table/model/PlayerDTO';
import { WhatIsMyMMRService } from '../services/mmr-service';
import { InvalidUrlError, OPGGService } from '../services/op-gg-service';

@Component({
  selector: 'app-match-data',
  templateUrl: './match-data.component.html',
  styleUrls: ['./match-data.component.css'],
})
export class MatchDataComponent implements OnInit {
  public matchDTO: MatchDTO = new MatchDTO();
  public matchUrlControl = new FormControl('');
  public matchUrlForm = this.formBuilder.group({
    matchUrl: this.matchUrlControl,
  });

  constructor(
    private opGGService: OPGGService,
    private whatIsMyMMRService: WhatIsMyMMRService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  getMatchData() {
    this.matchDTO = new MatchDTO();
    this.opGGService
      .getMatchParticipants(this.matchUrlControl.value)
      .pipe(
        catchError((e: InvalidUrlError) => {
          this.matchUrlControl.setErrors({ 'invalid-url': true });
          return of();
        })
      )
      .subscribe((matchInfo) => {
        // console.log(matchInfo);
        if (
          matchInfo.props?.pageProps.error &&
          matchInfo.props?.pageProps.error.status == 404
        ) {
          this.matchUrlControl.setErrors({ 'match-not-found': true });
          return;
        }
        let participants = matchInfo.props?.pageProps.game.participants || [];
        let region = matchInfo.props?.pageProps.region;
        let gameType = matchInfo.props?.pageProps.game.queue_info.game_type;
        if (region && gameType) {
          this.matchDTO = this.populateMatchData(
            participants,
            region,
            gameType
          );
        } else {
          console.log(
            `Undefined region [${region}] or game_type [${gameType}]`
          );
        }
      });
  }

  populateMatchData(
    participants: Participant[],
    region: string,
    gameType: string
  ): MatchDTO {
    let matchDTO = new MatchDTO(gameType);
    participants.forEach((participant) => {
      const player = this.getPlayer(matchDTO, participant);
      this.populatePlayerData(player, participant, region);
    });
    return matchDTO;
  }

  populatePlayerData(
    player: PlayerDTO,
    participant: Participant,
    region: string
  ) {
    player.name = participant.summoner.name;
    this.whatIsMyMMRService
      .getSummonerMMR(player.name, region)
      .subscribe((mmrResponse) => {
        player.mmr.rankedAvg = mmrResponse.ranked.avg;
        player.mmr.normalAvg = mmrResponse.normal.avg;
        player.mmr.aramAvg = mmrResponse.ARAM.avg;
      });
  }

  getPlayer(matchDTO: MatchDTO, participant: Participant): PlayerDTO {
    const participantIndex = (participant.participant_id - 1) % 5;
    switch (participant.team_key) {
      case 'RED':
        return matchDTO.redTeam.players[participantIndex];
      case 'BLUE':
        return matchDTO.blueTeam.players[participantIndex];
      default:
        throw new Error(`Undefined team key ${participant.team_key}`);
    }
  }
}
