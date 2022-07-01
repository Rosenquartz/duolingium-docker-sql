import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Item } from 'src/app/models/Item';
import { MultipleChoiceItem } from 'src/app/models/MultipleChoiceItem';
import { LanguageService } from 'src/app/services/language.service';

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
    private cookieService: CookieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const moduleId = this.route.snapshot.paramMap.get('moduleId')!
    this.languageService.getModuleItems(moduleId)
    .subscribe(out=>{
      //this.moduleType = out.type;
      this.moduleItems = out.items
      if (true) { // if (out.type == 'alphabet')
        console.log("module items are", this.moduleItems)
      }
      this.ready = 1
    })
  }

}
