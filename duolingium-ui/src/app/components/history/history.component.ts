import { Component, HostListener, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { LanguageService } from 'src/app/services/language.service';
import { TestService } from 'src/app/services/test.service';
import { CookieService } from 'ngx-cookie-service';

import { Language } from 'src/app/models/Language';
import { Module } from 'src/app/models/Module';
import { TestResult } from 'src/app/models/TestResult'
import { ViewportScroller } from '@angular/common';



@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  moduleList: Module[] = [];
  languageList: Language[] = [];
  tests: TestResult[] = [];

  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 1;
  visiblePages: number[] = [];

  filterLanguageId!: string;
  filterModuleId!: string;
  filterUserStatus: boolean = false;
  
  /* From https://stackoverflow.com/questions/59919034/angular-button-scroll-to-top */
  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event: Event){
    this.pageYoffset = window.pageYOffset;
  }

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

  constructor(
    private testService: TestService,
    private languageService: LanguageService,
    private cookieService: CookieService,
    private scroll: ViewportScroller
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
    this.testService.getTestResults({pageIndex: 1})
    .subscribe(out=>{
      this.tests = out.tests; 
      this.totalItems = out.total;
      this.updatePagination(this.totalItems);
      this.scrollToTop();
    })
  }

  loadPage(page: number): void {
    this.currentPage = page;
    let filterLanguageId, filterModuleId, userId;
    if (this.filterUserStatus) userId = this.cookieService.get('userId');
    if (this.filterLanguageId) filterLanguageId = this.filterLanguageId;
    if (this.filterModuleId) filterModuleId = this.filterModuleId;
    this.testService.getTestResults({languageId: filterLanguageId, moduleId: filterModuleId, userId: userId, pageIndex: page})
    .subscribe(out=>{
      this.tests = out.tests;
      this.totalItems = out.total;
      this.updatePagination(this.totalItems);
      this.scrollToTop();
    })
  }

  previousPage(): void {
    if (this.currentPage == 1) return;
    this.currentPage = this.currentPage - 1;
    this.loadPage(this.currentPage);
  }

  nextPage(): void {
    if (this.currentPage == this.totalPages) return;
    this.currentPage = this.currentPage + 1;
    this.loadPage(this.currentPage);
  }

  updatePagination(totalItems: number): void {
    this.totalPages = Math.ceil(totalItems / 25);
    this.visiblePages = [];
    if (this.totalPages <= 5) {
      for (let i = 1; i <= this.totalPages; i++) {
        this.visiblePages.push(i);
      }
    } else {
      if (this.currentPage <= 2) {
        for (let i = 1; i <= 5; i++) {
          this.visiblePages.push(i);
        }
      } else if (this.currentPage + 2 >= this.totalPages) {
        for (let i = this.totalPages - 4; i <= this.totalPages; i++) {
          this.visiblePages.push(i);
        }
      } else {
        for (let i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
          this.visiblePages.push(i);
        }
      }
    }
  }

  /* Filters */

  loadLanguage(languageId: string): void {
    this.languageService.getLanguageInfo(languageId)
    .pipe(switchMap((out)=>{
      this.languageDisplayButton = out.englishName;
      return this.languageService.getModuleList(languageId);
    })).pipe(switchMap(out=>{
      this.moduleDisplayButton = 'Modules'
      this.moduleList = out.modules;
      this.languageDisplay = 'none';
      this.filterLanguageId = languageId;
      let userId;
      if (this.filterUserStatus) userId = this.cookieService.get('userId');
      return this.testService.getTestResults({languageId: this.filterLanguageId, userId: userId, pageIndex: 1});
    })).subscribe((out)=>{
      this.tests = out.tests;
      this.totalItems = out.total;
      this.currentPage = 1;
      this.updatePagination(this.totalItems);
      this.scrollToTop();
    })
  }
  
  loadModule(module: Module): void {
    this.moduleDisplay = 'none';
    this.moduleDisplayButton = module.displayName;    
    this.filterModuleId = module.moduleId
    let userId;
    if (this.filterUserStatus) userId = this.cookieService.get('userId');
    this.testService.getTestResults({languageId: this.filterLanguageId, moduleId: this.filterModuleId, userId: userId, pageIndex: 1})
    .subscribe((out)=>{
      this.tests = out.tests;
      this.totalItems = out.total;
      this.currentPage = 1;
      this.updatePagination(this.totalItems);
      this.scrollToTop();
    })
  }

  filterByUser(): void {
    if (!this.filterUserStatus) {
      let filterLanguageId; let filterModuleId;
      if (this.filterLanguageId) filterLanguageId = this.filterLanguageId;
      if (this.filterModuleId) filterModuleId = this.filterModuleId;
      this.filterUserStatus = true;
      let userId = this.cookieService.get('userId');
      this.testService.getTestResults({languageId: filterLanguageId, moduleId: filterModuleId, userId: userId, pageIndex: 1})
      .subscribe((out)=>{
        this.tests = out.tests;
        this.totalItems = out.total;
        this.currentPage = 1;
        this.updatePagination(this.totalItems);
        this.scrollToTop();
      })
    } else {
      let filterLanguageId; let filterModuleId;
      if (this.filterLanguageId) filterLanguageId = this.filterLanguageId;
      if (this.filterModuleId) filterModuleId = this.filterModuleId;
      this.filterUserStatus = false;
      this.testService.getTestResults({languageId: filterLanguageId, moduleId: filterModuleId, pageIndex: 1})
      .subscribe((out)=>{
        this.tests = out.tests;
        this.totalItems = out.total;
        this.currentPage = 1;
        this.updatePagination(this.totalItems);
        this.scrollToTop();
      })
    }
  }

  clearFilters(): void {
    this.filterLanguageId = '';
    this.filterModuleId = '';
    this.filterUserStatus = false;

    this.languageDisplay = 'none';
    this.languageDisplayButton = 'Languages';
    this.moduleDisplay = 'none';
    this.moduleDisplayButton = 'Modules';
    this.moduleList = [];

    this.loadAllTests();
  }

  /* Manual Drop Down Links Logic */

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

  /* TEST: CREATE 100 RESULTS */
  insertTestResults(): void {

    let possibleResults = [{languageId: 'kr', englishName: 'Korean', nativeName: '한글', moduleId: '947f1764', displayName: 'Hangul', maxScore: 10},
                          {languageId: 'kr', englishName: 'Korean', nativeName: '한글', moduleId: '76e4aca6', displayName: 'Vocabulary (Easy)', maxScore: 10},
                          {languageId: 'kr', englishName: 'Korean', nativeName: '한글', moduleId: 'a6886c66', displayName: 'Vocabulary (Hard)', maxScore: 6},
                          {languageId: 'jp', englishName: 'Japanese', nativeName: '日本語', moduleId: 'd46703bf', displayName: 'Hiragana', maxScore: 6},
                          {languageId: 'jp', englishName: 'Japanese', nativeName: '日本語', moduleId: 'ba0f0f6c', displayName: 'Katakana', maxScore: 6},
                          {languageId: 'jp', englishName: 'Japanese', nativeName: '日本語', moduleId: '1a0b034f', displayName: 'Vocabulary', maxScore: 6}];
    let possibleUserIds = ['tabby', 'mittens', 'socks'];

    for (let i = 0; i < 5; i ++) {
      let userId = possibleUserIds[Math.floor(Math.random() * possibleUserIds.length)];
      let results = possibleResults[Math.floor(Math.random() * possibleResults.length)];
      let score = Math.floor(Math.random() * (results.maxScore+1));
      let time = Math.floor(Math.random() * (1000)) + 100;
      let newDate = new Date();
      let date = newDate.toISOString().slice(0, 19).replace('T', ' ');

      this.testService.sendTestResults(
        results.languageId,
        results.englishName,
        results.nativeName,
        results.moduleId,
        results.displayName,
        userId,
        results.maxScore,
        score,
        time,
        date
      ).subscribe((out)=>{
      })
    }

  }

  get math() {
    return Math;
  }

}
