import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  cssSolution: Array<string> = [];
  stitchedSolution = '';

  startingChapter: number = 1;

  solution = '';

  isSolutionValid: boolean = false;

  constructor() { }

  public compileSolution() {
    this.stitchedSolution = '';
    this.attachSolution(this.stitchedSolution);
    if (this.cssSolution) {
      this.cssSolution.forEach(snip => {
        this.stitchedSolution += snip;
      })
    }
    this.attachSolution(this.stitchedSolution);
    this.stitchedSolution = '';
  }

  public attachSolution(text: string) {
    let styleTag = document.querySelector("style");

    if (styleTag) {
      styleTag.innerText = text;
    }
  }
}
