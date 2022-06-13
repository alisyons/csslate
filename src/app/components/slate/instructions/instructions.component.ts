import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Level} from "../../../shared/level";
import {SharedService} from "../../../shared/shared.service";
import {animate, style, transition, trigger, state} from "@angular/animations";

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out',
              style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('1s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class InstructionsComponent implements OnInit {

  levelName = '';
  chapter: number = 100;

  @Input()
  currentLevel: Level | undefined;

  @Output()
  nextLevel = new EventEmitter<Level>();

  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
  }

  public goToNextLevel() {
    this.nextLevel.emit(this.currentLevel);
  }

}
