import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  modules: Array <any> = [];

  constructor(
    private cookieService: CookieService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log('henlo:',this.cookieService.get('henlo'))
    console.log('testo:',this.cookieService.get('Test'))
    this.userService.getUsers().subscribe((out:any)=>{console.log("USERS:",out)})
    this.userService.getPreferredLanguage(this.cookieService.get('userId')).subscribe(out=>{
      this.modules = out;
      console.log("Modules:", this.modules)
      for (let i of this.modules) {console.log(i.displayName)}
    })
  }

}
