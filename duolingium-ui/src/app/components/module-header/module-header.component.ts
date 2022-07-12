import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-module-header',
  templateUrl: './module-header.component.html',
  styleUrls: ['./module-header.component.css']
})
export class ModuleHeaderComponent implements OnInit {

  @Input() currentProgress: number = 0;
  currentProgressString: string = '0%';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentProgress']) {
      this.currentProgress = changes['currentProgress'].currentValue;
      this.currentProgressString = `${this.currentProgress}%`;
    }
  }

}
