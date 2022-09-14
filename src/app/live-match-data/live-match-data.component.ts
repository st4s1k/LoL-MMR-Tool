import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrentGameInfo } from 'RiotApi';
import { catchError, mergeMap, of } from 'rxjs';
import { MatchDTO } from '../mmr-table/model/MatchDTO';
import { PlayerDTO } from '../mmr-table/model/PlayerDTO';
import { WhatIsMyMMRService } from '../services/mmr-service';
import { RiotApiService } from '../services/riot-api-service';

@Component({
  selector: 'app-live-match-data',
  templateUrl: './live-match-data.component.html',
  styleUrls: ['./live-match-data.component.css'],
})
export class LiveMatchDataComponent implements OnInit {
  public matchDTO: MatchDTO = new MatchDTO();

  public regions = ['EUW', 'NA', 'EUNE', 'KR'];

  public summonerNameControl = new FormControl('', Validators.required);
  public regionControl = new FormControl(this.regions[0]);

  public summonerNameForm = new FormGroup({
    summonerName: this.summonerNameControl,
    region: this.regionControl,
  });

  constructor(
    private whatIsMyMMRService: WhatIsMyMMRService,
    private riotApiService: RiotApiService
  ) {}

  ngOnInit(): void {}

  getMatchData() {
    if (
      this.summonerNameForm.value.summonerName &&
      this.summonerNameForm.value.region
    ) {
      this.matchDTO = new MatchDTO();
      const region = this.summonerNameForm.value.region;
      const summonerName = this.summonerNameForm.value.summonerName;
      this.riotApiService
        .getSummonerByName(summonerName, region)
        .pipe(
          catchError((error: HttpErrorResponse, caught) => {
            if (error.status == 404) {
              this.summonerNameControl.setErrors({ 'summoner-not-found': true });
            }
            return of();
          }),
          mergeMap((summoner) =>
            this.riotApiService.getCurrentGameInfo(summoner.id, region).pipe(
              catchError((error: HttpErrorResponse, caught) => {
                if (error.status == 404) {
                  this.summonerNameControl.setErrors({ 'game-not-found': true });
                }
                return of();
              })
            )
          )
        )
        .subscribe((currentGameInfo) => {
          // console.log(currentGameInfo);
          const queueId = currentGameInfo.gameQueueConfigId;
          const gameType = this.getGameType(queueId);
          // console.log(`${queueId} ${gameType}`);
          this.matchDTO = this.populateMatchData(
            currentGameInfo,
            region,
            gameType
          );
        });
    }
  }
  getGameType(gameQueueConfigId: number): string {
    switch (gameQueueConfigId) {
      case 450:
        return 'aram';
      case 420:
        return 'ranked';
      case 400:
      case 430:
        return 'normal';
      default:
        throw new Error(`Undefined queue id: ${gameQueueConfigId}`);
    }
  }

  populateMatchData(
    currentGameInfo: CurrentGameInfo,
    region: string,
    gameType: string
  ): MatchDTO {
    let matchDTO = new MatchDTO(gameType);
    let participants = currentGameInfo.participants;
    participants
      .filter((participant) => participant.teamId === 100)
      .map((p) => p.summonerName)
      .forEach((summonerName, index) => {
        const player = matchDTO.blueTeam.players[index];
        this.populatePlayerData(player, summonerName, region);
      });
    participants
      .filter((participant) => participant.teamId === 200)
      .map((p) => p.summonerName)
      .forEach((summonerName, index) => {
        const player = matchDTO.redTeam.players[index];
        this.populatePlayerData(player, summonerName, region);
      });
    return matchDTO;
  }

  populatePlayerData(player: PlayerDTO, summonerName: string, region: string) {
    player.name = summonerName;
    this.whatIsMyMMRService
      .getSummonerMMR(player.name, region)
      .subscribe((mmrResponse) => {
        player.mmr.rankedAvg = mmrResponse.ranked.avg;
        player.mmr.normalAvg = mmrResponse.normal.avg;
        player.mmr.aramAvg = mmrResponse.ARAM.avg;
      });
  }
}
