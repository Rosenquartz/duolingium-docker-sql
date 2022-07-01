import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { ModuleComponent } from './components/module/module.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ModuleLearnComponent } from './components/module-learn/module-learn.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'learn', component: HomePageComponent},
  { path: 'learn/:moduleId', component: ModuleLearnComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
