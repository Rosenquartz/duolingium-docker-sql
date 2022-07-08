import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Language } from 'src/app/models/Language';
import { LanguageService } from 'src/app/services/language.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userId: string = '';
  language!: Language;
  @Input() centerText: string = ''

  constructor(
    private cookieService: CookieService,
    private languageService: LanguageService
  ) { }

  ngOnInit(): void { 
    if (!this.centerText) {
      this.userId = this.cookieService.get('userId');
      this.getLanguage(this.cookieService.get('languageId'));
    }
  }

  getLanguage(languageId: string): void {
    this.languageService.getLanguageInfo(languageId)
    .subscribe((out:any)=>{
      this.language = out; 
      this.centerText = `${this.language.englishName}/${this.language.nativeName}`;
    })
  }

}
