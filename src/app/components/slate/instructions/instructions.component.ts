import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  levelName = '';
  chapter: number = 100;

  @Input()
  level: number = 100;

  constructor() { }

  ngOnInit(): void {
  }

}
