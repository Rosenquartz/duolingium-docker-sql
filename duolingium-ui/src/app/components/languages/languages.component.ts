import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Lenguaje } from 'src/app/models/Language';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  languages: Lenguaje[] = [];

  constructor(
    private userService: UserService,
    private languageService: LanguageService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.loadLanguages();
  }

  loadLanguages(): void {
    this.languageService.getLanguages()
    .subscribe(out=>{
      console.log("languages are:", out)
      for (let language of out) {
        this.languages.push(language)
      }
    });
  }

  selectLanguage(selected: string): void {
    console.log("selected ", selected)
    const userId = this.cookieService.get('userId');
    this.userService.setPreferredLanguage(userId, selected)
    .subscribe(
      (out:any)=>{
        console.log("set language Id cookie to ", selected);
        this.cookieService.set('languageId', selected);
        
        window.location.href = '/learn';
    })
  }

}
