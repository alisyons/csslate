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

  levelArray: Array<Level> = [];

  tracker: boolean = true;

  constructor(
    public sharedService: SharedService,
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.setLevelArray();

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
      console.log(this.currentLevel)
    }
  }

  public onNextLevel(level: Level) {
    this.sharedService.solution = '';
    this.sharedService.isSolutionValid = false;
    this.sharedService.compileSolution();
    this.levelArray = [];
    this.setLevelArray();
    if (this.currentLevel) {
      this.getLevel(level.chapter, level.level + 1);
    }
  }

  public onPreviousLevel(level: Level) {
    this.sharedService.solution = '';
    this.sharedService.isSolutionValid = false;
    this.sharedService.compileSolution();
    this.levelArray = [];
    this.setLevelArray();
    if (this.currentLevel && this.currentLevel.level > 1) {
      this.getLevel(level.chapter, level.level - 1);
    }
  }

}
