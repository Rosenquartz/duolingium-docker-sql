import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Lenguaje } from 'src/app/models/Language';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userId: string = '';
  language!: Lenguaje;

  constructor(
    private cookieService: CookieService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void { 
    console.log("Header: language id is ", this.cookieService.get('languageId'))
    this.userId = this.cookieService.get('userId');
    this.getLanguage(this.cookieService.get('languageId'));
  }

  getLanguage(languageId: string): void {
    this.languageService.getLanguages()
    .subscribe((out:any)=>{
      console.log("preferred language is",out)
      for (let lang of out) {
        console.log("lang is", lang.languageId)
        if (lang.languageId == languageId) {
          this.language = lang;
          break;
        }
      }
    })
  }

}
