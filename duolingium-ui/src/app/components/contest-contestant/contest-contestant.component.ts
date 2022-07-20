import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { MultipleChoiceQuestion } from 'src/app/models/MultipleChoiceQuestion';
import { ContestService } from 'src/app/services/contest.service';

@Component({
  selector: 'app-contest-contestant',
  templateUrl: './contest-contestant.component.html',
  styleUrls: ['./contest-contestant.component.css']
})
export class ContestContestantComponent implements OnInit {

  @Input() contestId!: string;

  currentQuestion!: MultipleChoiceQuestion;  
  currentAnswer: string = '';
  answered: boolean = false;
  timer: number = 0;

  _questionSub!: Subscription;
  _pettyTimerSub!: Subscription;
  _timerSub!: Subscription;

  constructor(
    private contestService: ContestService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this._questionSub = this.contestService.loadItem
    .subscribe(out=>{
      this.currentQuestion = out.question
      this.reset();
    })

    this._pettyTimerSub = this.contestService.pettyTimer
    .subscribe(out=>{
      this.timer = out.timer;
    })

    this._timerSub = this.contestService.timer
    .subscribe(out=>{
      this.timer = out.timer;
    })
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
    this.contestService.emitContestantAnswer(this.contestId, userId, this.currentAnswer)
    this.answered = true;
  }

  reset(): void {
    this.currentAnswer = '';
    this.answered = false;
  }

}
