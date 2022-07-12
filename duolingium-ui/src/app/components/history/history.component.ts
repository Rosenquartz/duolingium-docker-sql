import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { TestService } from 'src/app/services/test.service';

import { Language } from 'src/app/models/Language';
import { CookieService } from 'ngx-cookie-service';
import { Module } from 'src/app/models/Module';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  moduleList: Array<any> = [];
  languageList: Language[] = [];
  shownTests: Array<any> = [];
  allTests: Array<any> = [];

  filterLanguageId!: string;
  filterModuleId!: string;
  filterUserId!: string;

  constructor(
    private testService: TestService,
    private languageService: LanguageService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.displayLanguages();
    this.loadAllTests();
  }

  displayLanguages(): void {
    this.languageService.getLanguageList()
    .subscribe(out=>{this.languageList = out})
  }

  loadAllTests(): void {
    this.testService.getAllTests()
    .subscribe(out=>{
      this.allTests = out; 
      this.shownTests = this.allTests.map(x=>x);
      console.log("All tests", out);
    })
  }

  /* OLD LANUGUAGE AND MODULE FILTER */
  /*
  loadLanguage(languageId: string): void {
    this.languageService.getLanguageInfo(languageId)
    .pipe(switchMap((out)=>{
      this.languageDisplayButton = out.englishName;
      return this.languageService.getModuleList(languageId);
    })).subscribe(out=>{
      this.moduleList = out.modules;
      this.languageDisplay = 'none';
      console.log(out);
    })
  }

  loadTestsByModule(moduleId: string): void {
    this.testService.getAllTestsByModule(moduleId)
    .subscribe(out=>{
      this.allTests = out;
    })
  }
  */

  /* NEW LANGUAGE AND MODULE FILTER */
  loadLanguage(languageId: string): void {
    this.languageService.getLanguageInfo(languageId)
    .pipe(switchMap((out)=>{
      this.languageDisplayButton = out.englishName;
      this.shownTests = this.allTests.filter(x=>{return x.languageId == languageId});
      return this.languageService.getModuleList(languageId);
    })).subscribe(out=>{
      this.moduleDisplayButton = 'Modules'
      this.moduleList = out.modules;
      this.languageDisplay = 'none';
      console.log(out);
    })
  }

  loadModule(module: Module): void {
    console.log(module.displayName)
    this.shownTests = this.allTests.filter(x=>{return x.moduleId == module.moduleId});
    this.moduleDisplay = 'none';
    this.moduleDisplayButton = module.displayName;
    console.log("Filtering by module");
  }

  // Manual Drop Down Links

  languageDisplay: string = 'none';
  languageDisplayButton: string = 'Languages';
  toggleLanguageDropDown(): void {
    if (this.languageDisplay == 'none') {
      this.languageDisplay = 'block';
      this.moduleDisplay = 'none';
    }
    else if (this.languageDisplay == 'block') {
      this.languageDisplay = 'none';
    }
  }

  moduleDisplay: string = 'none';
  moduleDisplayButton: string = 'Modules';
  toggleModuleDropDown(): void {
    if (this.moduleDisplay == 'none') {
      this.moduleDisplay = 'block';
      this.languageDisplay = 'none';
    }
    else if (this.moduleDisplay == 'block') {
      this.moduleDisplay = 'none';
    }
  }

  /* Filters */
  
  filterStatus = false; // 0: all tests, 1: user tests

  clearFilters(): void {
    this.languageDisplay = 'none';
    this.languageDisplayButton = 'Languages';
    this.moduleDisplay = 'none';
    this.moduleDisplayButton = 'Modules';
    this.moduleList = [];
    this.shownTests = this.allTests.map(x=>x)
  }

  filterTestsByUser(): void {
    if (!this.filterStatus) {
      this.filterStatus = true;
      const userId = this.cookieService.get('userId')
      this.shownTests = this.shownTests.filter(x=>{
        return x.userId == userId;
      })
    } else if (this.filterStatus) {
      this.filterStatus = false;
      this.shownTests = this.allTests.map(x=>x);
    }
    console.log("Tests:");
    console.log(this.allTests);
  }

}
