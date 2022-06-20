import {Component, OnInit, OnChanges, ChangeDetectorRef, ViewChild} from '@angular/core';
import levelsJSON from '../../../assets/scripts/levels.json';
import {Level} from "../../shared/level";
import {parseJson} from "@angular/cli/utilities/json-file";
import {SharedService} from "../../shared/shared.service";
import {EditorComponent} from "./editor/editor.component";
@Component({
  selector: 'app-slate',
  templateUrl: './slate.component.html',
  styleUrls: ['./slate.component.scss']
})
export class SlateComponent implements OnInit {

  currentLevel: Level | undefined;
  isLastLevel: boolean = false;
  isFirstLevel: boolean = false;

  levelArray: Array<Level> = [];

  tracker: boolean = true;

  constructor(
    public sharedService: SharedService,
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.setLevelArray();
    this.isFirstLevel = true;

    this.getLevel(1, 1);
  }

  private setLevelArray() {
    this.levelArray = levelsJSON.levels.map(xx => {

      return <Level>
        {
          name: xx.name,
          chapter: xx.chapter,
          level: xx.number,
          person: xx.person,
          dialogue: xx.dialogue,
          description: xx.description,
          htmlSnippets: xx.htmlSnippets,
          cssSnippets: xx.cssSnippets,
          solution: xx.solution
        };
    })

    this.maxChapter();
  }

  public getLevel(chapter: number, level: number) {
    let foundLevel;

    if(this.levelArray) {
      foundLevel = this.levelArray.filter(e => {
        return e.level === level && e.chapter === chapter;
      })

      if (foundLevel.length === 1) {
        this.currentLevel = foundLevel[0];
      }
    }
  }

  public maxChapter(): number {
    let chapters: Array<number> = [];

    this.levelArray.forEach(l => {
      chapters.push(l.chapter);
    })

    return Math.max.apply(null, chapters);
  }

  public maxLevel(ch: number): number {
    let levelNumbers: Array<number> = [];
    let levelsInChapter;

    levelsInChapter = this.levelArray.filter(e => e.chapter === ch);

    levelsInChapter.forEach(l => {
      levelNumbers.push(l.level);
    })
    return Math.max.apply(null, levelNumbers);

  }

  public onSelectChapter(chapter: number) {
    this.getLevel(chapter, 1);
    this.checkLastOrFirstChapter();
  }

  public checkLastOrFirstChapter() {
    if (this.currentLevel) {
      if(this.currentLevel.chapter === 1 && this.currentLevel.level === 1) {
        this.isFirstLevel = true;
      } else if (this.currentLevel.chapter === this.maxChapter() && this.currentLevel.level === this.maxLevel(this.maxChapter())) {
        this.isLastLevel = true;
      }
    }
  }

  public onNextLevel(level: Level) {
    this.isFirstLevel = false;
    this.sharedService.solution = '';
    this.sharedService.isSolutionValid = false;
    this.sharedService.compileSolution();
    this.levelArray = [];
    this.setLevelArray();
    this.isFirstLevel = false;

    let maxLevel = this.maxLevel(level.chapter);

    if (this.currentLevel) {
      if(this.currentLevel.level < maxLevel) {
        this.getLevel(level.chapter, level.level + 1);
        this.checkLastOrFirstChapter();
      } else if (this.currentLevel.chapter < this.maxChapter()) {
        this.getLevel(level.chapter + 1, level.level = 1);
        this.checkLastOrFirstChapter();
      }
    }
  }

  public onPreviousLevel(level: Level) {
    this.isLastLevel = false;
    this.sharedService.solution = '';
    this.sharedService.isSolutionValid = false;
    this.sharedService.compileSolution();
    this.levelArray = [];
    this.setLevelArray();
    if (this.currentLevel) {
      if (this.currentLevel.level > 1) {
        this.getLevel(level.chapter, level.level - 1);
        this.checkLastOrFirstChapter();
      } else if (this.currentLevel.chapter > 1) {
        this.getLevel(level.chapter - 1, level.level = this.maxLevel(level.chapter-1));
        this.checkLastOrFirstChapter();
      }
    }
  }
}
