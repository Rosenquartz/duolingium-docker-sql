import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ModuleComponent } from './components/module/module.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ModuleLearnComponent } from './components/module-learn/module-learn.component';
import { LanguagesComponent } from './components/languages/languages.component';
import { HistoryComponent } from './components/history/history.component';
import { TestComponent } from './components/test/test.component';
import { HistoryOptimizedComponent } from './components/history-optimized/history-optimized.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'languages', component: LanguagesComponent },
  { path: 'learn', component: HomePageComponent },
  { path: 'learn/:moduleId', component: ModuleLearnComponent },
  { path: 'history-offset', component: HistoryComponent },
  { path: 'history', component: HistoryOptimizedComponent },
  { path: 'test/:moduleId', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
