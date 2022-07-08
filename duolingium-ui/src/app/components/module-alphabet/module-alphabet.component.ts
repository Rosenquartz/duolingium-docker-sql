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
  @Output() changeButtonText = new EventEmitter<string>;
  @Output() changeFooterMessage = new EventEmitter<string>;

  questions: MultipleChoiceQuestion[] = [];
  ready: number = 0;

  allNativeChoices: string[] = [];
  allEnglishChoices: string[] = [];

  currentQuestion!: MultipleChoiceQuestion;
  currentNumber: number = 0;
  currentAnswer: string = '';

  footerVisible: number = 0;
  correct: string = '';

  finished: number = 0;

  footerButton: string = 'Check';
  footerMessage: string = '';
  footerStatus: string = 'check';

  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private progressService: ProgressService
  ) { }

  ngOnInit(): void {
    console.log("itemes are", this.items)
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

  answerClicked (choice: string): void {
    console.log("answer clicked")
    if (choice == this.currentAnswer) {
      this.currentAnswer = '';
      return;
    }
    this.currentAnswer = choice;
    console.log(this.currentAnswer)
  }

  async footerClicked(status: string): Promise<void> {
    if (status == 'check') {
      await this.check()
      this.footerStatus = 'nextItem';
      this.footerButton = 'next'
    } else if (status.includes('nextItem')) {
      await this.nextItem()
      this.footerMessage = ''
      this.footerStatus = 'check'
      this.footerButton = 'Check'
    }
  }

  check() :void {
    console.log("checking")
    let userId = this.cookieService.get('userId')
    let moduleId = this.route.snapshot.paramMap.get('moduleId')!
    let itemId = this.questions[this.currentNumber].itemId
    let type = this.questions[this.currentNumber].type
    let answer = this.currentAnswer
    this.progressService.checkItem(userId, moduleId, itemId, type, answer)
    .subscribe(out=>{
      this.correct = out.correct; 
      this.footerVisible = 1
      if (this.correct) {this.footerMessage = 'Correct!'; this.footerStatus = 'nextItem correct'}
      else {this.footerMessage = 'Incorrect!'; this.footerStatus = 'nextItem wrong'}
    })
  }

  nextItem(): void {
    if (!this.finished) {
      this.footerVisible = 0;
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
    console.log("finished")
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
    console.log("returning", choices, "for", type, item.native, item.english)
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

  /*

  items: Array<any> = [];
  questions: Array<any> = [];
  setUp: Number = 0;

  nativeChoices: Array<string> = [];
  englishChoices: Array<string> = [];

  currentItem: MultipleChoiceItem = {};
  currentNumber: number = 0;

  constructor(
    private languageService: LanguageService,
    private cookieService: CookieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getModuleItems();
  }

  getModuleItems(): void {
    const moduleId = this.route.snapshot.paramMap.get('moduleId')!;
    this.languageService.getModuleItems(moduleId)
    .subscribe(async (out) => {
      this.items = out.items;
      await this.setUpChoices();
      console.log("Choices set up")
      this.currentItem = this.questions[0];
      this.setUp = 1;
    });
  }

  async setUpChoices(): Promise<void> {
    for (let item of this.items) {
      this.nativeChoices.push(item.native);
      this.englishChoices.push(item.english)
    }
    await this.setUpQuestions();
    console.log("Finished setupchoices()")
  }

  async setUpQuestions(): Promise<void> {
    for (let i=0; i < this.nativeChoices.length; i++) {
      let tempNativeChoices = await this.shuffle(this.nativeChoices);
      tempNativeChoices = tempNativeChoices.filter(x=>x != this.nativeChoices[i])
      let tempEnglishChoices = await this.shuffle(this.englishChoices);
      tempEnglishChoices = tempEnglishChoices.filter(x=>x != this.englishChoices[i])
      this.questions.push({ item: this.nativeChoices[i], choices: tempNativeChoices})
      this.questions.push({ item: this.englishChoices[i], choices: tempEnglishChoices})
    }
    console.log("Finished set up questions", this.questions)
  }

  async shuffle(array: Array<any>): Promise<Array<any>> {
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
  
  nextItem(): void {
    this.currentNumber = this.currentNumber + 1;
    if (this.currentNumber >= this.questions.length) {
      console.log("FINIS")
      return;
    }
    this.currentItem = this.questions[this.currentNumber]
  }
  */

}
