import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ContestService } from 'src/app/services/contest.service';
import { Subscription, tap } from 'rxjs';
import { Module } from 'src/app/models/Module';
import { Language } from 'src/app/models/Language';
import { LanguageService } from 'src/app/services/language.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-contest-lobby',
  templateUrl: './contest-lobby.component.html',
  styleUrls: ['./contest-lobby.component.css']
})
export class ContestLobbyComponent implements OnInit {

  state: string = 'selectionScreen';
  centerText: string = 'Contest Lobby'
  users: Array<any> = [];
  contestId: string = '';
  inputContestId: string = '';

  _userJoinedSub!: Subscription;
  _startGameSub!: Subscription;

  /* create lobby buttons */
  moduleList: Module[] = [];
  languageList: Language[] = [];
  currentModule!: Module;
  currentLanguage!: Language;
  shownModule: string = 'Modules';
  shownLanguage: string = 'Languages';
  languageDisplay: string = 'none';
  moduleDisplay: string = 'none'
  createLobbyDisabled: string = 'true';

  constructor(
    private languageService: LanguageService,
    private contestService: ContestService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.loadLanguages();

    this._userJoinedSub = this.contestService.userJoined
    .subscribe(out=>{this.users = out; console.log("Output from user joined subscription", out)})

    this._startGameSub = this.contestService.startGame
    .subscribe(out=>{
      this._userJoinedSub.unsubscribe();
      console.log("Starting game!")
      this.startGameAsContestant();
    })
    
  }

  createLobby(): void {
    if (this.shownLanguage == 'Languages' || this.shownModule == 'Modules') {console.log('NO!');return;}
    this.contestService.createLobby(this.currentLanguage.languageId, this.currentModule.moduleId, 20)
    .subscribe(out=>{
      this.contestId = out.contestId;
      this.state = 'lobbyConductor';
      this.centerText = 'Contest Conductor'
      this.contestService.emitJoinAsConductor(this.contestId);
    })
  }

  errorMessage: string = '';

  joinLobby(): void {
    if (!this.inputContestId) return;
    let userId = this.cookieService.get('userId');
    this.contestService.checkLobby(this.inputContestId)
    .pipe(tap(out=>{
      console.log(out);
      if (!out.exists) throw new TypeError('Does not exist')
    })).pipe(switchMap(out=>{
      return this.contestService.joinLobby(this.inputContestId, userId)
    })).subscribe(out=>{
      this.contestId = out.contestId;
      this.users = out.users
      this.state = "standby";
      this.centerText = 'Contestant'
      this.contestService.emitJoinAsContestant(this.contestId, this.users)
    }, err=>{
      this.errorMessage = 'Does not exist!';
      setTimeout(()=>{this.errorMessage = ''}, 2000)
    })
  }

  /* Conductor functions */
  startGameAsConductor(): void {
    console.log("Emitting startGame as conductor")
    this.contestService.emitStartGame(this.contestId);
    this.state = "conducting"
  }

  /* Conductor Button Functions */
  loadLanguages(): void {
    this.languageService.getLanguageList()
    .subscribe(out=>{this.languageList = out})
  }

  toggleLanguageDropDown(): void {
    if (this.languageDisplay == 'none') {
      this.languageDisplay = 'block';
      this.moduleDisplay = 'none';
    }
    else if (this.languageDisplay == 'block') {
      this.languageDisplay = 'none';
    }
  }

  toggleModuleDropDown(): void {
    if (this.moduleDisplay == 'none') {
      this.moduleDisplay = 'block';
      this.languageDisplay = 'none';
    }
    else if (this.moduleDisplay == 'block') {
      this.moduleDisplay = 'none';
    }
  }

  selectLanguage(language: Language): void {
    this.languageService.getLanguageInfo(language.languageId)
    .pipe(switchMap((out)=>{
      this.currentLanguage = out;
      this.shownLanguage = out.englishName;
      return this.languageService.getModuleList(language.languageId);
    })).subscribe(out=>{
      this.currentModule = out
      this.moduleList = out.modules;
      this.languageDisplay = 'none';
      this.shownModule='Modules';
      this.createLobbyDisabled = 'true';
    })
  }

  selectModule(module: Module): void {
    this.currentModule = module;
    this.shownModule = module.displayName;
    this.moduleDisplay = 'none';
    this.createLobbyDisabled = 'false';
  }


  /* Contestant functions */
  startGameAsContestant(): void {
    console.log("Starting game as contestant")
    this.state = "ongoing"
  }

}
