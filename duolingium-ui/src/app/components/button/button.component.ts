import { Component, EventEmitter, Input, Output, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() buttonText: string = '';
  @Input() selected: boolean = true;
  @Output() clicked = new EventEmitter<string>;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selected = changes['selected'].currentValue;
    console.log("Changing selected to", this.selected);
  }

  onClick(buttonText: string): void {
    console.log(`Clicking ${buttonText} from button component.`)
    this.clicked.emit(buttonText)
  }

}
