import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { MultipleChoiceQuestion } from 'src/app/models/MultipleChoiceQuestion';
import { ContestService } from 'src/app/services/contest.service';

interface Contestant {
  userId: string,
  score: number
}

@Component({
  selector: 'app-contest-contestant',
  templateUrl: './contest-contestant.component.html',
  styleUrls: ['./contest-contestant.component.css']
})
export class ContestContestantComponent implements OnInit {

  @Input() contestId!: string;

  currentQuestion!: MultipleChoiceQuestion;  
  currentItem: number = 0;
  totalItems: number = 0;
  currentAnswer: string = '';
  answered: boolean = false;

  countdownTimer: number = 0;
  totalTimer: number = 0;

  _questionSub!: Subscription;
  _startPettyTimerSub!: Subscription;
  _startTimerSub!: Subscription;
  _timerUpdateSub!: Subscription;
  _showRankingsSub!: Subscription;
  _hideRankingsSub!: Subscription;

  ready: boolean = false;
  getReady: boolean = true;
  finished: boolean = false;

  rankings: Contestant[] = [];
  itemRankings: Array<any> = [];
  contestantAnswers: {[key:string]:string} = {};
  showingRankings: boolean = false;
  userId: string = '';

  footerMessage: string = '';
  bgColor: string = 'e5e5e5';
  buttonText: string = 'submit';
  buttonDisabled: string = 'false';

  constructor(
    private contestService: ContestService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.userId = this.cookieService.get('userId')

    this._questionSub = this.contestService.loadItem
    .subscribe(out=>{
      this.currentQuestion = out.question;
      this.currentItem = out.currentItem;
      this.totalItems = out.totalItems;
      this.reset();
      console.log("this.getready from _questionSub is", this.getReady)
    })

    this._startPettyTimerSub = this.contestService.startPettyTimer
    .subscribe(out=>{
      console.log("this.getready from _startPettyTimerSub is", this.getReady)
      this.totalTimer = out.timer;
      this.getReady = true;
      this.showingRankings = false;
    })

    this._startTimerSub = this.contestService.startTimer
    .subscribe(out=>{
      this.totalTimer = out.timer;
      this.getReady = false;
      this.showingRankings = false;
    })

    this._timerUpdateSub = this.contestService.timerUpdate
    .subscribe(out=>{
      console.log("this.getready from _timerUpdateSub is", this.getReady)
      this.countdownTimer = out.timer;
    })

    this._hideRankingsSub = this.contestService.hideRankings
    .subscribe(out=>{
      this.showingRankings = false;
    })

    this._showRankingsSub = this.contestService.showRankings
    .subscribe(out=>{
      this.rankings = out.rankings;
      this.itemRankings = out.itemRankings;
      this.contestantAnswers = out.contestantAnswers
      this.showingRankings = true;
    })

    this.ready = true;
  }

  choiceClicked(answer: string): void {
    if (this.currentAnswer == answer) {
      this.currentAnswer = '';
      return;
    }
    this.currentAnswer = answer;
  }

  submitClicked(): void {
    let userId = this.cookieService.get('userId')
    console.log("Submitting", userId, this.currentAnswer)
    this.contestService.emitContestantAnswer(this.contestId, userId, this.currentAnswer)
    this.answered = true;
  }

  reset(): void {
    this.currentAnswer = '';
    this.answered = false;
  }

}
