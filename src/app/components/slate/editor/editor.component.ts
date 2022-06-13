import {Component, EventEmitter, Input, OnInit, Output, OnChanges} from '@angular/core';
import {Level} from "../../../shared/level";
import {SharedService} from "../../../shared/shared.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Input()
  currentLevel: Level | undefined;

  snippetLength = 0;
  solution = '';

  constructor(
    public sharedService: SharedService
  ) {
  }

  ngOnInit(): void {
    if (this.currentLevel) {
      this.snippetLength = this.currentLevel.cssSnippets.length;
      this.sharedService.cssSolution = this.currentLevel.cssSnippets;
    }
  }



  public compileSolution(text: string) {
    if (this.currentLevel) {
      this.currentLevel.cssSnippets.pop();

      if(this.currentLevel.cssSnippets.length == this.snippetLength - 1) {
        this.currentLevel.cssSnippets.push(text);
        this.currentLevel.cssSnippets.push('}');
      } else {
        this.currentLevel.cssSnippets.pop();
        this.currentLevel.cssSnippets.push(text);
        this.currentLevel.cssSnippets.push('}');
      }

      this.sharedService.cssSolution = this.currentLevel.cssSnippets;
      this.sharedService.compileSolution();

      let solutionNoWhitespace = this.sharedService.solution.replace(' ', '');

      if (
        this.currentLevel.solution === solutionNoWhitespace || this.currentLevel.solution + ';' === solutionNoWhitespace) {
        this.sharedService.isSolutionValid = true;
      } else {
        this.sharedService.isSolutionValid = false;
      }

      console.log(this.sharedService.cssSolution);
    }
  }

}


