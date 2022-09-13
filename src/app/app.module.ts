import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiveMatchDataComponent } from './live-match-data/live-match-data.component';
import { MatchDataComponent } from './match-data/match-data.component';
import { MmrTableComponent } from './mmr-table/mmr-table.component';
import { WhatIsMyMMRService } from './services/mmr-service';
import { OPGGService } from './services/op-gg-service';
import { RiotApiService } from './services/riot-api-service';
import { ScraperService } from './services/scrapper-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MatchDataComponent,
    MmrTableComponent,
    LiveMatchDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [OPGGService, WhatIsMyMMRService, ScraperService, RiotApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
