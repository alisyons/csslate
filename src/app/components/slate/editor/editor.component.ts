import {Component, Input, OnInit} from '@angular/core';
import {Level} from "../../../shared/level";

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Input()
  currentLevel: Level | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
