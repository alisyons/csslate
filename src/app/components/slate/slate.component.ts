import { Component, OnInit } from '@angular/core';
import levelsJSON from '../../../assets/scripts/levels.json';
import {Level} from "../../shared/level";
import {parseJson} from "@angular/cli/utilities/json-file";
@Component({
  selector: 'app-slate',
  templateUrl: './slate.component.html',
  styleUrls: ['./slate.component.scss']
})
export class SlateComponent implements OnInit {

  currentLevel: Level | undefined;

  levelArray: Array<Level> = [];

  constructor() { }

  ngOnInit(): void {
    this.levelArray = levelsJSON.levels.map(xx => {

      return <Level>
        {
          name: xx.name,
          chapter: xx.chapter,
          level: xx.number,
          htmlSnippets: xx.htmlSnippets,
          cssSnippets: xx.cssSnippets
        };
    })

    this.getCurrentLevel();
  }

  public getCurrentLevel() {
    let foundLevel;

    if(this.levelArray) {
      foundLevel = this.levelArray.filter(e => {
        return e.level === 0 && e.chapter === 1;
      })

      if (foundLevel.length === 1) {
        this.currentLevel = foundLevel[0];
      }
      console.log(this.currentLevel)
    }
  }

}
