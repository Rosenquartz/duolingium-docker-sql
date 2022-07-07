import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
