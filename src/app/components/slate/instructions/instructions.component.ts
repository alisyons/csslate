import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
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
            style({ opacity: 0 }),
            animate('1s ease-out',
              style({ opacity: 1 }))
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

  @Input()
  isLastLevel: boolean = false;

  @Input()
  isFirstLevel: boolean = false;

  @Output()
  nextLevel = new EventEmitter<Level>();

  @Output()
  previousLevel = new EventEmitter<Level>();

  @Output()
  selectChapter = new EventEmitter<number>();

  @Input()
  maxChapter: number = 0;
  chapters: Array<number> = [];
  selectedChapter: number = 0;

  constructor(
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    for (let i = 1; i < this.maxChapter+1; i++) {
      this.chapters.push(i);
    }

    if(this.currentLevel) {
      this.selectedChapter = this.currentLevel?.chapter;
    }
  }

  public goToNextLevel() {
    this.nextLevel.emit(this.currentLevel);

    this.resetTextAreaHeight();
  }

  private resetTextAreaHeight() {
    let el = document.getElementById('editor-textarea');

    if (el) {
      el.style.height = '1rem';
    }
  }

  public goToPreviousLevel() {
    this.previousLevel.emit(this.currentLevel);
    this.resetTextAreaHeight();
  }

  public onSelectChapter() {
    this.selectChapter.emit(this.selectedChapter);
  }

}
