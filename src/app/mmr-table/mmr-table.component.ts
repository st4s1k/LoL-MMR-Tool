import { Component, Input, OnInit } from '@angular/core';
import { MatchDTO } from './model/MatchDTO';

@Component({
  selector: 'app-mmr-table',
  templateUrl: './mmr-table.component.html',
  styleUrls: ['./mmr-table.component.css']
})
export class MmrTableComponent implements OnInit {

  @Input() matchDTO = new MatchDTO();

  constructor() { }

  ngOnInit(): void {
  }

}
