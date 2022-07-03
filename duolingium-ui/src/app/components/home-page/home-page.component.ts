import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProgressService } from 'src/app/services/progress.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  what: string = '20';
  ready: number = 0;
  
  moduleInfo: Array <any> = [];
  moduleProgress: Array <any> = [];

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private progressService: ProgressService
  ) { }

  ngOnInit(): void {
    this.userService.getPreferredLanguage(this.cookieService.get('userId')).subscribe(out=>{
      console.log("current user:", this.cookieService.get('userId'))
      this.cookieService.set('preferredLanguage', out.preferredLanguage);
      this.moduleInfo = out.modules;
      this.progressService.getProgressModules(this.cookieService.get('userId'), this.cookieService.get('preferredLanguage'))
      .subscribe(out=>{
        console.log(this.cookieService.get("preferredLanguage"))
        for (let moduleProgress of out) {
          for (let module of this.moduleInfo) {
            if (moduleProgress.moduleId == module.moduleId) {
              module.started = 1
              module.progress = moduleProgress.completed / moduleProgress.total * 100
              console.log("PROGRESS:", module.progress)
              if (module.progress == 100) {module.completed = 1}
              else (module.completed = 0)
            }
          }
        }
        console.log("moduleInfo:", this.moduleInfo);
        this.ready = 1;
      })
    })
  }

}
