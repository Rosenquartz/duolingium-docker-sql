import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  items: Array<any> = [];

  constructor(
    private languageService: LanguageService,
    private cookieService: CookieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getModuleItems();
  }

  getModuleItems(): void {
    const moduleId = this.route.snapshot.paramMap.get('moduleId')!;
    //this.languageService.getModuleItems(moduleId)
    //.subscribe(out=>{console.log("out is", out); this.items = out.items});
  }

}
