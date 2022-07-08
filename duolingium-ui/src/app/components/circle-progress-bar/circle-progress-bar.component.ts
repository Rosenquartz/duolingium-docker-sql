import { Component, OnInit, Input, SimpleChanges, ElementRef } from '@angular/core';

@Component({
  selector: 'app-circle-progress-bar',
  templateUrl: './circle-progress-bar.component.html',
  styleUrls: ['./circle-progress-bar.component.css']
})
export class CircleProgressBarComponent implements OnInit {
  @Input() progress!: number;

  constructor(private host: ElementRef<HTMLElement>) { }

  ngOnInit(): void { }
    
  ngOnChanges(changes: SimpleChanges) {
    const value = changes['progress'].currentValue;

    const property = 'stroke-dashoffset' // or 'background' depending on the approach you choose
    const progressValue = this.computeProgressValue(value);

    this.host.nativeElement.style.setProperty(`--progress-${property}`, progressValue);
  }
    
  computeProgressValue(val: number): string {
    // if conic-gradient approach
    const angle = 360 * val;
    return `radial-gradient(white 50%, transparent 51%),
    conic-gradient(transparent 0deg ${angle}deg, gainsboro ${angle}deg 360deg),
    conic-gradient(orange 0deg, yellow 90deg, lightgreen 180deg, green)`;
    
    // if SVG approach
    // return 100 - (100 * val);
  }

}
