import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { DetailsCardComponent } from './components/details-card/details-card.component';
import { LeagueTabComponent } from './components/league-tab/league-tab.component';
import { MainComponent } from './components/main/main.component';
import { MainComponentService } from './services/main.service';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsCardComponent,
    LeagueTabComponent,
    MainComponent,
    LoginPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [MainComponentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
