import {Component, Input, OnInit} from '@angular/core';
import {Level} from "../../../shared/level";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input()
  currentLevel: Level | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
