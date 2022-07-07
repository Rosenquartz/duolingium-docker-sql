import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MultipleChoiceQuestion } from 'src/app/models/MultipleChoiceQuestion';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() question!: MultipleChoiceQuestion;
  @Output() buttonClicked = new EventEmitter<string>();
  currentAnswer: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  answerClicked(choice: string): void {
    if (choice == this.currentAnswer) {
      console.log(`Unclicked ${choice} from child.`)
      this.currentAnswer = '';
      this.buttonClicked.emit(this.currentAnswer);
      return;
    }
    console.log(`Clicked ${choice} from child.`)
    this.currentAnswer = choice;
    this.buttonClicked.emit(this.currentAnswer);
  }

}
