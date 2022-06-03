import {Component, Input, OnInit} from '@angular/core';
import {Level} from "../../../shared/level";

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  levelName = '';
  chapter: number = 100;

  @Input()
  currentLevel: Level | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
