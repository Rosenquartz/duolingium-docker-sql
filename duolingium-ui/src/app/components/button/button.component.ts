import { Component, EventEmitter, Input, Output, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() buttonText: string = '';
  @Input() selected: boolean = false;
  @Input() classes!: string;
  @Input() disabled: string = 'false';
  @Output() clicked = new EventEmitter<string>;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected']){
      this.selected = changes['selected'].currentValue;
    }
    if (changes['disabled']) {
      this.disabled = changes['disabled'].currentValue;
    }
  }

  onClick(buttonText: string): void {
    this.clicked.emit(buttonText);
  }

}
