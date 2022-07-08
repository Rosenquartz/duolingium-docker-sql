import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { TestService } from 'src/app/services/test.service';

import { Language } from 'src/app/models/Language';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  moduleList: Array<any> = [];
  languageList: Language[] = [];
  tests: Array<any> = [];

  constructor(
    private testService: TestService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.displayLanguages();
    this.loadAllTests();
  }

  displayLanguages(): void {
    this.languageService.getLanguageList()
    .subscribe(out=>{this.languageList = out})
  }

  loadLanguage(languageId: string): void {
    this.languageService.getModuleList(languageId)
    .subscribe(out=>{this.moduleList = out.modules})
  }

  loadAllTests(): void {
    this.testService.getAllTests()
    .subscribe(out=>{this.tests = out; console.log(out)})
  }

  loadTestsByModule(moduleId: string): void {
    this.testService.getAllTestsByModule(moduleId)
    .subscribe(out=>{this.tests = out})
  }
}
