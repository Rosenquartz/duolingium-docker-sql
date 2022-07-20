import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { ModuleComponent } from './components/module/module.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ModuleLearnComponent } from './components/module-learn/module-learn.component';
import { ModuleAlphabetComponent } from './components/module-alphabet/module-alphabet.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { HomePageModuleComponent } from './components/home-page-module/home-page-module.component';
import { TestComponent } from './components/test/test.component';
import { HistoryComponent } from './components/history/history.component';
import { ItemComponent } from './components/item/item.component';
import { ButtonComponent } from './components/button/button.component';
import { TestAlphabetComponent } from './components/test-alphabet/test-alphabet.component';
import { TimerComponent } from './components/timer/timer.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

import { CircleProgressBarComponent } from './components/circle-progress-bar/circle-progress-bar.component';
import { ModuleHeaderComponent } from './components/module-header/module-header.component';
import { ModuleFooterComponent } from './components/module-footer/module-footer.component';
import { TestHeaderComponent } from './components/test-header/test-header.component';
import { TestFooterComponent } from './components/test-footer/test-footer.component';
import { DateTimePipe } from './pipes/date-time.pipe';
import { ScoreScreenComponent } from './components/score-screen/score-screen.component';
import { HistoryOptimizedComponent } from './components/history-optimized/history-optimized.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ContestLobbyComponent } from './components/contest-lobby/contest-lobby.component';
import { ContestConductorComponent } from './components/contest-conductor/contest-conductor.component';
import { ContestContestantComponent } from './components/contest-contestant/contest-contestant.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
// use the port number you used to set up the express app
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ModuleComponent,
    HomePageComponent,
    ModuleLearnComponent,
    ModuleAlphabetComponent,
    LanguagesComponent,
    HomePageModuleComponent,
    TestComponent,
    HistoryComponent,
    ItemComponent,
    ButtonComponent,
    TestAlphabetComponent,
    TimerComponent,
    ProgressBarComponent,
    CircleProgressBarComponent,
    ModuleHeaderComponent,
    ModuleFooterComponent,
    TestHeaderComponent,
    TestFooterComponent,
    DateTimePipe,
    ScoreScreenComponent,
    HistoryOptimizedComponent,
    ContestLobbyComponent,
    ContestConductorComponent,
    ContestContestantComponent,
    CountdownTimerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
