import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  cssSolution: Array<string> = [];
  stitchedSolution = '';

  constructor() { }

  public compileSolution() {
    if (this.cssSolution) {
      this.cssSolution.forEach(snip => {
        this.stitchedSolution += snip;
      })
    }

    let styleTag = document.querySelector("style");

    if (styleTag) {
      styleTag.innerText = this.stitchedSolution;
    }
  }
}
