import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProgressService } from 'src/app/services/progress.service';
import { UserService } from 'src/app/services/user.service';
import { map, filter, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  ready: number = 0;

  userId: string = ''
  languageId: string = ''
  
  moduleInfo: Array <any> = [];
  moduleProgress: Array <any> = [];

  constructor(
    private cookieService: CookieService,
    private userService: UserService,
    private progressService: ProgressService
  ) { }

  ngOnInit(): void {
    this.userId = this.cookieService.get('userId');
    this.userService.getPreferredLanguage(this.userId)
    .subscribe(out=>{

      this.cookieService.set('preferredLanguage', out.preferredLanguage);
      this.languageId=out.preferredLanguage;

      // Use JSON.parse(JSON.stringify()) to 'clone' object.
      this.moduleInfo = JSON.parse(JSON.stringify(out.modules));

      this.progressService.getProgressModules(this.userId, this.languageId)
      .subscribe(out=>{
        for (let moduleProgress of out) {
          for (let module of this.moduleInfo) {
            if (moduleProgress.moduleId == module.moduleId) {
              module.started = 1
              module.progress = Math.floor(moduleProgress.completed / moduleProgress.total * 100)
              if (module.progress == 100) {module.completed = 1}
              else (module.completed = 0)
              break;
            }
          }
        }
        this.ready = 1; 
      })
      /*
      .subscribe(out=>{
        
        for (let moduleProgress of out) {
          for (let module of this.moduleInfo) {
            if (moduleProgress.moduleId == module.moduleId) {
              module.started = 1
              module.progress = Math.floor(moduleProgress.completed / moduleProgress.total * 100)
              if (module.progress == 100) {module.completed = 1}
              else (module.completed = 0)
              break;
            }
          }
        }
        this.ready = 1;
      })
      */
    })
  }

}
