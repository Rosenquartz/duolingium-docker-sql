import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MultipleChoiceQuestion } from 'src/app/models/MultipleChoiceQuestion';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() question!: MultipleChoiceQuestion;
  @Input() currentAnswer!: string;
  @Output() buttonClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    console.log("New Item")
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentAnswer = changes['currentAnswer'].currentValue;
    console.log("Changing item component's current answer to", this.currentAnswer);
  }

  answerClicked(choice: string): void {
    if (choice == this.currentAnswer) {
      this.currentAnswer = choice;
      this.buttonClicked.emit(this.currentAnswer);
      return;
    }
    this.currentAnswer = choice;
    this.buttonClicked.emit(this.currentAnswer);
  }

}
