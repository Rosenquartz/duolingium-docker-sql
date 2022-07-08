import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-module-footer',
  templateUrl: './module-footer.component.html',
  styleUrls: ['./module-footer.component.css']
})
export class ModuleFooterComponent implements OnInit {

  @Input() buttonText!: string;
  @Input() messageText!: string;
  @Input() status!: string;
  @Input() bgColor!: string;
  @Output() buttonClicked = new EventEmitter<string>;

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
      else if (this.status.includes('correct')) this.bgColor = '89E219';
      else if (this.status.includes('wrong')) this.bgColor = 'FF4B4B';
    }
  }

  buttonClick(): void {
    this.buttonClicked.emit(this.status);
  }

}
