import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-test-footer',
  templateUrl: './test-footer.component.html',
  styleUrls: ['./test-footer.component.css']
})
export class TestFooterComponent implements OnInit {

  @Input() buttonText!: string;
  @Input() messageText!: string;
  @Input() status!: string;
  @Input() bgColor!: string;
  @Input() currentAnswer!: string;
  @Output() buttonClicked = new EventEmitter<string>;

  buttonDisabled: string = 'true'

  constructor() { }

  ngOnInit(): void {
    if(!this.bgColor) {
      this.bgColor = 'D5D5D5'
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['buttonText']) {
      this.buttonText = changes['buttonText'].currentValue;
    }
    if (changes['messageText']) {
      this.messageText = changes['messageText'].currentValue;
    }
    if (changes['status']) {
      this.status = changes['status'].currentValue;
      if (this.status.includes('check')) this.bgColor = 'D5D5D5';
      else if (this.status.includes('finish')) this.bgColor = '89E219';
      else if (this.status.includes('correct')) this.bgColor = '89E219';
      else if (this.status.includes('wrong')) this.bgColor = 'FF4B4B';
    }
    if (changes['currentAnswer']) {
      this.currentAnswer = changes['currentAnswer'].currentValue;
      console.log("New current answer is", this.currentAnswer)
      if (this.status.includes('finish')) {
        this.buttonDisabled = 'false'
      } else if (this.currentAnswer) {
        this.buttonDisabled = 'false'
      } else {
        this.buttonDisabled = 'true'
      }
    }
  }

  buttonClick(): void {
    this.buttonClicked.emit(this.status);
  }

}
