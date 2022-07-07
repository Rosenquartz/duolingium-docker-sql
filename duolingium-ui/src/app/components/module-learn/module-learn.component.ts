import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from 'src/app/models/Item';
import { MultipleChoiceItem } from 'src/app/models/MultipleChoiceItem';

import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from 'src/app/services/language.service';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-module-learn',
  templateUrl: './module-learn.component.html',
  styleUrls: ['./module-learn.component.css']
})
export class ModuleLearnComponent implements OnInit {

  moduleType: string = 'alphabet';
  moduleItems: Item[] = [];
  ready: number = 0;

  constructor(
    private languageService: LanguageService,
    private progressService: ProgressService,
    private cookieService: CookieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userId = this.cookieService.get('userId');
    const languageId = this.cookieService.get('languageId');
    const moduleId = this.route.snapshot.paramMap.get('moduleId')!;
    console.log("starting on ", userId, languageId, moduleId);
    this.progressService.getProgressModule(userId, languageId, moduleId)
    .subscribe(out=>{
      console.log("get progress module out is", out)
      this.getItems(moduleId);
    })
  }

  getItems(moduleId: string): void {
    const languageId = this.cookieService.get('languageId');
    this.languageService.getModuleItems(languageId, moduleId)
    .subscribe(out=>{
      console.log("out of get items is", out)
      //this.moduleType = out.type;
      this.moduleItems = out.items
      if (true) { // if (out.type == 'alphabet')
        console.log("module items are", this.moduleItems)
      }
      this.ready = 1
    })
  }

}
