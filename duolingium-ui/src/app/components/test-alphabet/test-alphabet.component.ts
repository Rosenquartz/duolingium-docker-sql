import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { Item } from 'src/app/models/Item';
import { MultipleChoiceQuestion } from 'src/app/models/MultipleChoiceQuestion';

import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from 'src/app/services/language.service';
import { ProgressService } from 'src/app/services/progress.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test-alphabet',
  templateUrl: './test-alphabet.component.html',
  styleUrls: ['./test-alphabet.component.css']
})
export class TestAlphabetComponent implements OnInit {

  @Input() items: Item[] = [];

  questions: MultipleChoiceQuestion[] = [];
  allNativeChoices: string[] = [];
  allEnglishChoices: string[] = [];
  
  ready: number = 0;
  currentQuestion!: MultipleChoiceQuestion;
  currentNumber: number = 0;
  currentProgress: number = 0;
  currentAnswer: string = '';
  correctAnswers: number = 0;
  correct: string = '';
  finished: number = 0;

  running: boolean = false;
  time: number = 0;
  currentScore: number = 0;

  footerButton: string = 'check';
  footerMessage: string = '';
  footerStatus: string = 'check';

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private languageService: LanguageService,
    private progressService: ProgressService,
    private testService: TestService
  ) { }

  ngOnInit(): void {
    this.setUpQuestions()
    .then(()=>{
      this.ready = 1
      this.running = true;
    })
  }

  /* EVENTS */

  choiceClicked(newAnswer: string): void {
    if (newAnswer == this.currentAnswer) {
      this.currentAnswer = '';
      return;
    }
    this.currentAnswer = newAnswer;
  }

  async footerClicked(status: string): Promise<void> {
    if (status == 'check') {
      await this.check()
      this.footerStatus = 'nextItem';
      this.footerButton = 'next'
    } else if (status.includes('nextItem')) {
      await this.nextItem()
      if (!this.finished) {
        this.footerMessage = ''
        this.footerStatus = 'check'
        this.footerButton = 'check'
      }
    } else if (status == 'finish') {
      window.location.href = '/learn';
    }
  }

  changeRunState(running:boolean): void {
    this.running = running
  }

  getTime(time: number): void {
    this.time = time;
  }

  check() :void {
    this.running = false;
    let userId = this.cookieService.get('userId')
    let moduleId = this.route.snapshot.paramMap.get('moduleId')!
    let itemId = this.questions[this.currentNumber].itemId
    let type = this.questions[this.currentNumber].type
    let answer = this.currentAnswer
    this.progressService.checkItem(userId, moduleId, itemId, type, answer)
    .subscribe(out=>{
      this.correct = out.correct; 
      this.correctAnswers += out.correct ? 1 : 0; 
      if (this.correct) {this.footerMessage = 'Correct!'; this.footerStatus = 'nextItem correct'}
      else {this.footerMessage = 'Incorrect!'; this.footerStatus = 'nextItem wrong'}      
      this.currentProgress = Number((this.currentNumber+1) / (2*this.items.length) * 100);
      console.log("New current progress is", this.currentProgress)
    })
  }

  nextItem(): void {
    if (!this.finished) {
      this.correct = '';
      this.currentNumber += 1;
      this.currentAnswer = '';
      if (this.currentNumber == 2*this.items.length) {
        this.currentNumber -= 1;
        this.endModule()
      } else {
        this.running = true;
      }
    }
  }

  async endModule(): Promise<void> {
    this.finished = 1;
    console.log("Module Finished!")

    this.footerButton = "Finish!"
    this.footerStatus = "finish"
    this.footerMessage = `Test finished!`

    let userId = this.cookieService.get('userId')
    let languageId = this.cookieService.get('languageId')
    let englishName = '';
    let nativeName = '';
    let moduleId = this.route.snapshot.paramMap.get('moduleId')!;
    let displayName = '';
    let total = 2 * this.items.length
    let newDate = new Date()
    let date = newDate.toISOString().slice(0, 19).replace('T', ' ');

    this.languageService.getLanguageInfo(languageId)
    .pipe(switchMap(out=>{
      englishName = out.englishName; 
      nativeName = out.nativeName;
      return this.languageService.getModuleInfo(languageId, moduleId)
    })).pipe(switchMap(out=>{      
      displayName = out.displayName;
      console.log("Sending test results")
      return this.testService.sendTestResults(
        languageId,
        englishName,
        nativeName, 
        moduleId, 
        displayName,
        userId, 
        total, 
        this.correctAnswers, 
        this.time, 
        date
    )})).subscribe((out)=>{
      console.log("Sent test results")
    })
  }

  exit(): void {
    window.location.href = '/learn';
  }
  

  /* Item Setup */

  async setUpQuestions(): Promise<void> {
    await this.setUpAllChoices();
    let i = 0; let j = 0;
    for (let i = 0; i < this.items.length; i++) {
      let nativeChoices = await this.setChoices(this.items[i], "native")
      this.questions.push({
        itemId: this.items[i].itemId,
        type: "native",
        english: this.items[i].english,
        choices: nativeChoices
      })

      let englishChoices = await this.setChoices(this.items[i], "english")
      this.questions.push({
        itemId: this.items[i].itemId,
        type: "english",
        native: this.items[i].native,
        choices: englishChoices
      })
    }
    let q2 = await this.shuffleArray(this.questions)
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
