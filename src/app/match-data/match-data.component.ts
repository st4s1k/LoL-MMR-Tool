import { Component, OnInit } from '@angular/core';
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
  participants: string[] = [];
  matchUrl: string = 'https://euw.op.gg/summoners/euw/LowZero/matches/xX1o0DE1RCUlMZUTTfVv6LH5uCtPX_iKIKUGWkZKArE%3D/1662494063000';

  constructor(private opGgService: OPGGService) {}

  showParticipants() {
    if (this.matchUrl.trim().length > 0) {
      this.opGgService
        .getMatchParticipants(this.matchUrl)
        .subscribe((ps) => ps.forEach((p, i) => this.participants.push(p)));
    }
  }

  ngOnInit(): void {}
}
