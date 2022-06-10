import {Component, Input, OnInit} from '@angular/core';
import {Level} from "../../../shared/level";
import {SharedService} from "../../../shared/shared.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input()
  currentLevel: Level | undefined;

  stitchedHTML: string = '';
  stitchedCSS: string = '';

  constructor(
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.compileHTML();
    this.compileCSS();
  }

  public compileHTML() {
    if (this.currentLevel?.htmlSnippets) {
      this.currentLevel.htmlSnippets.forEach(snip => {
        this.stitchedHTML += snip;
      })
      console.log(this.stitchedHTML)
    }
  }

  public compileCSS() {
    if (this.currentLevel?.cssSnippets) {
      this.currentLevel.cssSnippets.forEach(snip => {
        this.stitchedCSS += snip;
      })
    }

    let styleTag = document.querySelector("style");

    if (styleTag) {
      styleTag.innerText = this.stitchedCSS;
    }
  }

}
