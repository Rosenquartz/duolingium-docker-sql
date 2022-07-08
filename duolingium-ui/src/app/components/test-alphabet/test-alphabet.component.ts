import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

import { Item } from 'src/app/models/Item';
import { MultipleChoiceQuestion } from 'src/app/models/MultipleChoiceQuestion';

import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from 'src/app/services/language.service';
import { ProgressService } from 'src/app/services/progress.service';
import { TestService } from 'src/app/services/test.service';

import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-test-alphabet',
  templateUrl: './test-alphabet.component.html',
  styleUrls: ['./test-alphabet.component.css']
})
export class TestAlphabetComponent implements OnInit {

  @Input() items: Item[] = [];
  @Input() time: number = 0;
  @Output() changeScore = new EventEmitter<number>;
  @Output() runState = new EventEmitter<boolean>;

  questions: MultipleChoiceQuestion[] = [];
  ready: number = 0;

  allNativeChoices: string[] = [];
  allEnglishChoices: string[] = [];

  currentQuestion!: MultipleChoiceQuestion;
  currentNumber: number = 0;
  currentAnswer: string = '';
  correctAnswers: number = 0;

  footerVisible: number = 0;
  correct: string = '';

  finished: number = 0;

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
      this.runState.emit(true);
      console.log("Questions:"),
      console.log(this.questions)
    })
  }

  choiceClicked(newAnswer: string): void {
    this.currentAnswer = newAnswer;
  }

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

  answerClicked (choice: string): void {
    if (choice == this.currentAnswer) {
      this.currentAnswer = '';
      return;
    }
    this.currentAnswer = choice;
    console.log(this.currentAnswer)
  }

  check() :void {
    this.runState.emit(false)
    console.log("checking")
    let userId = this.cookieService.get('userId')
    let moduleId = this.route.snapshot.paramMap.get('moduleId')!
    let itemId = this.questions[this.currentNumber].itemId
    let type = this.questions[this.currentNumber].type
    let answer = this.currentAnswer
    this.progressService.checkItem(userId, moduleId, itemId, type, answer)
    .subscribe(out=>{
      this.correct = out.correct; 
      this.correctAnswers += out.correct ? 1 : 0; 
      console.log("correctAnswers is", this.correctAnswers)
      this.changeScore.emit(this.correctAnswers);
      this.footerVisible = 1
    })
  }

  async nextItem(): Promise<void> {
    if (!this.finished) {
      this.footerVisible = 0;
      this.correct = '';
      this.currentNumber += 1;
      console.log("Resetting current answer")
      this.currentAnswer = '';
      console.log("Reset current answer to", this.currentAnswer)
      if (this.currentNumber == 2*this.items.length) {
        this.currentNumber -= 1;
        this.endModule()
        .then(()=>{console.log("no error")})
        .catch((err)=>{console.error(err)})
      } else {
        this.runState.emit(true)
        console.log('started runState');
      }
    }
  }

  async endModule(): Promise<void> {
    this.finished = 1;
    console.log("finished")
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

    /*
    this.languageService.getModuleInfo(languageId, moduleId)
    .subscribe(out=>{console.log("out2", out)})
    */

    /*
    this.testService.sendTestResults(
      languageId,
      englishName,
      nativeName, 
      moduleId, 
      displayName,
      userId, 
      total, 
      this.correctAnswers, 
      this.time, 
      date)
    .subscribe(out=>{console.log("ogttem")})
    */
  }

}
