import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OPGGMatchInfo } from 'OPGGMatchInfo';
import { OPGGService } from '../services/op-gg-service';

interface Summoner {
  name: string;
  rankedAvg: number;
  normalAvg: number;
  aramAvg: number;
}

interface Team {
  summoners: Summoner[];
}

interface MatchData {
  team1: Team;
  team2: Team;
}

interface MatchDataRow {
  team1: Summoner;
  team2: Summoner;
}

@Component({
  selector: 'app-match-data',
  templateUrl: './match-data.component.html',
  styleUrls: ['./match-data.component.css'],
})
export class MatchDataComponent implements OnInit {
  matchInfo: OPGGMatchInfo = {};
  matchUrlForm = this.formBuilder.group({
    matchUrl:
      'https://euw.op.gg/summoners/euw/LowZero/matches/xX1o0DE1RCUcTyLI2XeuU6pOv7XtSbDoM25NfV2anvk%3D/1662756100000',
  });

  constructor(
    private opGgService: OPGGService,
    private formBuilder: FormBuilder
  ) {}

  showParticipants() {
    var url = this.matchUrlForm.value?.matchUrl || '';
    console.log(url);
    if (url.trim().length > 0) {
      this.opGgService
        .getMatchParticipants(url)
        .subscribe((matchInfo) => this.matchInfo = matchInfo);
    }
  }

  ngOnInit(): void {}
}
