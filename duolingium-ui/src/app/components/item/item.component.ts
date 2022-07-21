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
  @Input() englishName!: string;
  @Output() buttonClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentAnswer']) this.currentAnswer = changes['currentAnswer'].currentValue;
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
