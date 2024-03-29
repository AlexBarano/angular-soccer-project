import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { DetailsCardComponent } from './components/details-card/details-card.component';
import { LeagueTabComponent } from './components/league-tab/league-tab.component';
import { MainComponent } from './components/main/main.component';
import { MainComponentService } from './services/main.service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MapPageComponent } from './components/map-page/map-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
@NgModule({
  declarations: [
    AppComponent,
    DetailsCardComponent,
    LeagueTabComponent,
    MainComponent,
    LoginPageComponent,
    MapPageComponent,
    NavBarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [MainComponentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
