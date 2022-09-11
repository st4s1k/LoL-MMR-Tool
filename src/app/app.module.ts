import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatchDataComponent } from './match-data/match-data.component';
import { OPGGService } from './services/op-gg-service';
import { HttpClientModule } from '@angular/common/http';
import { WhatIsMyMMRService } from './services/mmr-service';
import { ScraperService } from './services/scrapper-service';

@NgModule({
  declarations: [
    AppComponent,
    MatchDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [OPGGService, WhatIsMyMMRService, ScraperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
