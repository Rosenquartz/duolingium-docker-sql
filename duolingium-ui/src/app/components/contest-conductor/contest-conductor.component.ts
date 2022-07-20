import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { MultipleChoiceQuestion } from 'src/app/models/MultipleChoiceQuestion';
import { ContestService } from 'src/app/services/contest.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-contest-conductor',
  templateUrl: './contest-conductor.component.html',
  styleUrls: ['./contest-conductor.component.css']
})
export class ContestConductorComponent implements OnInit {

  @Input() contestId!: string;
  @Input() languageId!: string;
  @Input() moduleId!: string;
  @Input() timer!: number;
  @Input() numberOfParticipants!: number;
  @Input() contestants!: string[];

  items: Item[] = [];
  allNativeChoices: string[] = [];
  allEnglishChoices: string[] = [];

  totalItems: number = 0;
  currentItem: number = 0;
  questions: MultipleChoiceQuestion[] = [];
  currentQuestion!: MultipleChoiceQuestion;
  contestItemId: string = '';

  interval!: ReturnType<typeof setInterval>;
  pettyTimer: boolean = false;
  countdownTimer: number = 0;
  nextItemButton: boolean = false;

  contestantAnswers: {[key:string]:string} = {};
  _contestantAnswerSub!: Subscription;

  constructor(
    private languageService: LanguageService,
    private contestService: ContestService
  ) { }

  ngOnInit(): void {
    this.getNumberOfItems();
    this.pettyTimer = true;
    this.startTimer(5);
    for (let contestant of this.contestants) {
      this.contestantAnswers[contestant] = "";
    }
    this._contestantAnswerSub = this.contestService.contestantAnswered
    .subscribe(out=>{
      this.contestantAnswers[out.userId] = out.answer      
      this.contestService.answerItem(
        this.contestItemId,
        this.contestId,
        out.userId,
        this.moduleId,
        this.currentQuestion.itemId,
        this.currentQuestion.type,
        out.answer
      ).subscribe(out=>{
        if (this.hasEverybodySubmitted()) this.showLeaderboards();
      });
    })
  }

  /* Initial Setup */

  getNumberOfItems(): void {
    this.languageService.getModuleItems(this.languageId, this.moduleId)
    .subscribe(out=>{
      this.totalItems = out.items.length * 2;
      this.items = out.items;
      this.setUpQuestions()
      .then(()=>{
        this.contestService.emitNextItem(this.contestId, this.currentQuestion)
      });
    })
  }

  /* Timer Logic */  

  startTimer(time: number): void {
    this.countdownTimer = time; 
    if (this.pettyTimer) this.contestService.emitPettyTimerUpdate(this.contestId, this.countdownTimer)
    else this.contestService.emitTimerUpdate(this.contestId, this.countdownTimer);
    this.interval = setInterval(() => {
      this.updateClock()
    },950)
  }

  stopTimer(): void {
    clearInterval(this.interval)
  }

  updateClock(): void {
    this.countdownTimer -= 1;
    if (this.countdownTimer <= 0) {
      if (this.pettyTimer) {
        this.countdownTimer = this.timer;
        this.contestService.emitTimerUpdate(this.contestId, this.countdownTimer)
        this.pettyTimer = false;
        this.loadItem();
      }
      else {
        this.contestService.emitTimerUpdate(this.contestId, this.countdownTimer)
        this.stopTimer();
        this.showLeaderboards();
      }
    } else {
      if (this.pettyTimer) this.contestService.emitPettyTimerUpdate(this.contestId, this.countdownTimer)
      else this.contestService.emitTimerUpdate(this.contestId, this.countdownTimer);
    }
  }

  /* Show results */

  hasEverybodySubmitted(): boolean {
    let result = true;
    for (let contestant of Object.keys(this.contestantAnswers)) {
      if (!this.contestantAnswers[contestant]) {
        result = false;
        break;
      } 
    }
    return result
  }

  showLeaderboards(): void {
    this.stopTimer();
    this.countdownTimer = 0;
    this.contestService.emitTimerUpdate(this.contestId, 0);
    this.nextItemButton = true;
    this.contestService.emitShowRankings(this.contestId);
  }

  /* Load Items */

  nextItem(): void {
    this.currentItem += 1;
    this.pettyTimer = true;
    this.startTimer(3);
  }

  loadItem(): void {
    if (this.currentItem >= this.totalItems) {
      console.log("Reached end of contest")
      return;
    }
    this.currentQuestion = this.questions[this.currentItem]
    this.contestService.startItem(this.contestId, this.moduleId, this.currentQuestion.itemId)
    .subscribe(out=>{
      this.contestItemId = out.contestItemId;
    })
    this.contestService.emitNextItem(this.contestId, this.currentQuestion)
    this.reset();
  }

  submitAnswers(): void {
    console.log("Submitting:")
    for (let contestant of Object.keys(this.contestantAnswers)) {
      console.log(this.contestItemId, this.contestId, contestant, this.moduleId, this.currentQuestion.itemId, this.currentQuestion.type, this.contestantAnswers[contestant])
      this.contestService.answerItem(
        this.contestItemId,
        this.contestId,
        contestant,
        this.moduleId,
        this.currentQuestion.itemId,
        this.currentQuestion.type,
        this.contestantAnswers[contestant]
      ).subscribe();
    }
  }

  reset(): void {
    for (let contestant of Object.keys(this.contestantAnswers)) {
      this.contestantAnswers[contestant] = '';
    }
    this.nextItemButton = false;
  }

  /* Item Setup */

  async setUpQuestions(): Promise<void> {
    let shuffledItems = await this.shuffleItems();
    await this.setUpAllChoices();
    let i = 0; let j = 0;
    for (let type of shuffledItems) {
      if (type == "native") {
        // Type = native means the answer has to be native
        let choices = await this.setChoices(this.items[i],type)
        this.questions.push({
          itemId: this.items[i].itemId,
          type: type,
          english: this.items[i].english,
          choices: choices
        })
        i += 1;
      } else {
        // Type = english means the answer has to be english
        let choices = await this.setChoices(this.items[j],type)
        this.questions.push({
          itemId: this.items[j].itemId,
          type: type,
          native: this.items[j].native,
          choices: choices
        })
        j += 1;
      }
      
    }
  }

  async setUpAllChoices(): Promise <void> {
    for (let item of this.items) {
      this.allNativeChoices.push(item.native);
      this.allEnglishChoices.push(item.english);
    }
  }

  async shuffleItems(): Promise <string[]> {
    let tempArray: string[] = [];
    for (let i of this.items) {
      tempArray.push("native");
      tempArray.push("english");
    }
    tempArray = await this.shuffleArray(tempArray);
    return tempArray
  }

  async setChoices(item: Item, type: string): Promise <string[]> {
    let choices: string[] = [];
    let numChoices = Math.min(3, this.items.length-1)
    if (type == 'native'){
      let tempArray = this.allNativeChoices.filter(x=>x!=item.native)
      choices.push(item.native)
      for (let i = 0; i < numChoices; i++) {
        choices.push(tempArray[i])
      }
    } else {
      let tempArray = this.allEnglishChoices.filter(x=>x!=item.english)
      choices.push(item.english)
      for (let i = 0; i < numChoices; i++) {
        choices.push(tempArray[i])
      }
    }
    choices = await this.shuffleArray(choices);
    return choices
  }

  async shuffleArray(array: Array<any>): Promise<Array<any>> {
    // Code from stack overflow!
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
}
