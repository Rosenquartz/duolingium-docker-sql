import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { trigger, transition, animate, style, state } from '@angular/animations'

@Component({
  selector: 'app-module-footer',
  templateUrl: './module-footer.component.html',
  styleUrls: ['./module-footer.component.css'],
  animations: [
    trigger('correctAnimation', [
      transition(":enter", [
          style({ opacity: 0, transform: "translateY(-100%)" }), //apply default styles before animation starts
          animate(
              "100ms ease-in-out",
              style({ opacity: 1, transform: "translateY(0)" })
          )
      ]),
      transition(":leave", [
          style({ opacity: 1, transform: "translateY(0)" }), //apply default styles before animation starts
          animate(
              "200ms ease-in-out",
              style({ opacity: 0, transform: "translateY(-100%)" })
          )
      ])
    ]),
    trigger('wrongAnimation', [
      transition(":enter", [
          style({ opacity: 0}), //apply default styles before animation starts
          animate(
              "300ms ease-in-out",
              style({ opacity: 1})
          )
      ]),
      transition(":leave", [
          style({ opacity: 1}), //apply default styles before animation starts
          animate(
              "400ms ease-in-out",
              style({ opacity: 0})
          )
      ])
    ])
  ]
})
export class ModuleFooterComponent implements OnInit {

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
