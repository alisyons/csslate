import {Component, EventEmitter, Input, OnInit, Output, OnChanges, ChangeDetectorRef} from '@angular/core';
import {Level} from "../../../shared/level";
import {SharedService} from "../../../shared/shared.service";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {

  @Input()
  currentLevel: Level | undefined;

  @Input()
  tracker: boolean = true;

  cssLocalArray: Array<string> = [];

  snippetLength = 0;
  solution = '';

  constructor(
    public sharedService: SharedService,
    public changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    if (this.currentLevel) {
      this.snippetLength = this.currentLevel.cssSnippets.length;
      this.sharedService.cssSolution = this.currentLevel.cssSnippets;
      this.localizeCss(this.currentLevel.cssSnippets);
    }
  }

  ngOnChanges() {
    if (this.currentLevel) {
      this.cssLocalArray = [];
      this.localizeCss(this.currentLevel.cssSnippets);
    }
  }

  public localizeCss(arr: Array<string>) {
    this.cssLocalArray = [];
    for (let i = 0; i < arr.length-1; i++) {
      this.cssLocalArray.push(arr[i]);
    }
  }

  public compileSolution(text: string) {
    if (this.currentLevel) {
      this.currentLevel.cssSnippets.pop();

      if(this.currentLevel.cssSnippets.length == this.cssLocalArray.length) {
        this.currentLevel.cssSnippets.push(text);
        this.currentLevel.cssSnippets.push('}');
      } else {
        this.currentLevel.cssSnippets.pop();
        this.currentLevel.cssSnippets.push(text);
        this.currentLevel.cssSnippets.push('}');
      }

      this.sharedService.cssSolution = this.currentLevel.cssSnippets;
      this.sharedService.compileSolution();

      this.currentLevel.cssSnippets.pop();
      this.currentLevel.cssSnippets.pop();
      this.currentLevel.cssSnippets.push('}');

      let solutionNoWhitespace = this.sharedService.solution.replace(' ', '');
      console.log(solutionNoWhitespace);

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


