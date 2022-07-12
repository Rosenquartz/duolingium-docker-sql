import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Item } from 'src/app/models/Item';
import { MultipleChoiceQuestion } from 'src/app/models/MultipleChoiceQuestion';

import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from 'src/app/services/language.service';
import { ProgressService } from 'src/app/services/progress.service';

@Component({
  selector: 'app-module-alphabet',
  templateUrl: './module-alphabet.component.html',
  styleUrls: ['./module-alphabet.component.css']
})
export class ModuleAlphabetComponent implements OnInit {

  @Input() items: Item[] = [];
  @Input() englishName!: string;
  @Output() changeButtonText = new EventEmitter<string>;
  @Output() changeFooterMessage = new EventEmitter<string>;
  ready: number = 0;

  questions: MultipleChoiceQuestion[] = [];
  allNativeChoices: string[] = [];
  allEnglishChoices: string[] = [];

  currentQuestion!: MultipleChoiceQuestion;
  currentNumber: number = 0;
  currentProgress: number = 0;
  currentAnswer: string = '';

  footerVisible: number = 0;
  correct: string = '';

  finished: number = 0;

  footerButton: string = 'check';
  footerMessage: string = '';
  footerStatus: string = 'check';

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private progressService: ProgressService
  ) { }

  ngOnInit(): void {
    this.setUpQuestions()
    .then(()=>{
      this.ready = 1
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

  check() :void {
    let userId = this.cookieService.get('userId')
    let moduleId = this.route.snapshot.paramMap.get('moduleId')!
    let itemId = this.questions[this.currentNumber].itemId
    let type = this.questions[this.currentNumber].type
    let answer = this.currentAnswer
    this.progressService.checkItem(userId, moduleId, itemId, type, answer)
    .subscribe(out=>{
      this.correct = out.correct; 
      if (this.correct) {this.footerMessage = 'Correct!'; this.footerStatus = 'nextItem correct'}
      else {this.footerMessage = 'Incorrect!'; this.footerStatus = 'nextItem wrong'};
      this.currentProgress = Number((this.currentNumber+1) / (2*this.items.length) * 100);
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
      }
    }
  }

  async endModule(): Promise<void> {
    this.finished = 1;
    console.log("Module Finished!")
    this.footerButton = "Finish!"
    this.footerStatus = "finish"
    this.footerMessage = `Module Finished!`
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
