import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { LanguageService } from 'src/app/services/language.service';
import { TestService } from 'src/app/services/test.service';

import { Lenguaje } from 'src/app/models/Language';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  moduleList: Array<any> = [];
  languageList: Lenguaje[] = [];
  tests: Array<any> = [];

  constructor(
    private testService: TestService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.displayLanguages()
  }

  displayLanguages(): void {
    this.languageService.getLanguages()
    .subscribe(out=>{
      console.log(out)
      this.languageList = out
    })
  }

  loadLanguage(languageId: string): void {
    console.log(languageId)
    this.languageService.getLanguage(languageId)
    .subscribe(out => {
      this.moduleList = out.modules
    })
  }

  loadAllTests(moduleId: string): void {
    console.log("loading module", moduleId)
    this.testService.getAllTestsByModule(moduleId).subscribe(
      out=>{this.tests=out}
    )
  }
}
