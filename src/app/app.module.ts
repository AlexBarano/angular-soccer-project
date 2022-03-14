import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { DetailsCardComponent } from './details-card/details-card.component';
import { LeagueTabComponent } from './league-tab/league-tab.component';
import { MainComponent } from './main/main.component';
import { MainComponentService } from './main/main.service';

@NgModule({
  declarations: [
    AppComponent,
    DetailsCardComponent,
    LeagueTabComponent,
    MainComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [MainComponentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
